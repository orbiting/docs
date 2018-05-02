# How to add new article elements

Prerequisites:

  - All repos are properly set up (See [How To Run](./how-to-run) guide)
  - You know how to add a new React component to the [Styleguide](https://github.com/orbiting/styleguide).
  - It's probably a good idea to have a glance at [the MDAST spec](https://github.com/syntax-tree/mdast) as this is the way we programmatically handle Markdown in all of our applications.
  - While not mandatory to get started, having at least superficial knowledge of [what Slate is and how it works](https://docs.slatejs.org/) will help.  

### Introduction

All our articles / documents get persisted as Markdown in a given Github repo. It is quite obvious that the possibilities offered by standard Markdown are simply not enough to express nested complex elements such as an InfoBox. We solve this by

1. ... having some basic non-intrusive extensions baked into our [Markdown parser](https://github.com/orbiting/remark-preset), such as Zones (nested elements, custom data) and Spans.
2. ... having a [schema layer](https://github.com/orbiting/styleguide/tree/master/src/templates), that deduces information from contextual factors.

An example:
```
<section><h6>FIGURE</h6>
  ![An image](path_to_image.jpg)

  An image.*By me*
</section>
```

Here you see a so-called zone that includes 2 paragraphs. Thanks to our parser extensions, the resulting AST will have the 2 paragraphs as only children of the zone `FIGURE`. It's the schema layer though, that says:

- If the first child is a paragraph that itself has an only child of type `image`, it's our figure image
- If there is a second paragraph, it's our caption.
- If the last child of our caption paragraph is of type emphasis, we use that as our caption byline.

### Example: Question-Answer element

We're going to build a small typographic helper to give editors a streamlined way of how to write and shape interview questions and answers.

At this point we assume already have all required components ready and available from the Styleguide:

```
import { QA } from '@project-r/styleguide'

<QA>
  <QA.Question>Her question</QA.Question>
  <QA.Answer>His Answer</QA.Answer>
</QA>
```

#### Planning in Markdown

When thinking about how your element gets persisted to Markdown, try to consider both structural requirements and readability. Here's how we could reason about our QA element:

1. Can we deduce a QA element without further scoping (position in document etc.)? Probably not. So let's use a zone `QA` for that.
2. Can we deduce the question and answer elements from the zone's children? Yes, we can. Two children, the first is the question, the second the answer.
3. We could denote the question as heading 6 though. Looks ok and makes context analysis simpler: h6 -> question, paragraph -> answer

So we set out for something like that:

```
<section><h6>QA</h6>

  ###### Her Question

  His Answer

</section>
```

#### Render your MDAST

If used with our [Markdown parser](https://github.com/orbiting/remark-preset) the snippet from above would result in the following MDAST data structure:

```
{
  type: "root",
  children: [
    {
      type: "zone",
      identifier: "QA",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "Her Question"
            }
          ]
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "His Answer"
            }
          ]
        }
      ]
    }
  ]
}
```

To have the frontend render our QA elements, we have to tell the schema layer how to handle this kind of Markdown / MDAST.

At this point, I assume you have the `backends`, the `styleguide` and `republik-frontend` apps running in dev mode, with the Styleguide [locally linked](https://docs.npmjs.com/cli/link) to the node_modules of `republik-frontend`.

Let's talk about document structure a bit, without going too much into detail.

An article is roughly structured like this

- Optional Figure Zone, the "cover image"
- Title Zone containing title, lead and credits
- Center Zone. Contains all things "continuous text" if you want. In terms of grid, it contains elements that live around the borders of the centered sections.

I'd say our QA element pretty much fits the criteria for continuous text, so, in the schema, we want to add QA as possible child of Center Zone.

Now we simply add a small definition block to the `rules` list of the [Center Zone definition block](https://github.com/orbiting/styleguide/blob/v5.73.1/src/templates/Article/index.js#L680):

```
// Somehere in the import section
import { QA } from '@project-r/styleguide'

// definition block
{
  matchMdast: matchZone('QA'),
  component: QA,
  rules: [
    {
      matchMdast: matchHeading(6),
      component: QA.Question,
      rules: globalInlines
    },
    {
      matchMdast: matchParagraph,
      component: QA.Answer,
      rules: globalInlines
    }
  ]
},
```

The `globalInlines` is a collection of basic text definitions.

You'll find further API docs in the README of our [mdast-react-render](https://github.com/orbiting/mdast/tree/master/packages/mdast-react-render)

Now, if you went and manually added a QA element to one of our existing [test repositories](https://github.com/republik-test) AND manually published the commit (Github release) ...

Well, that doesn't sound very practical, does it.

#### Show in Publikator

*It's probably a good time to recall that the schema is part of the [styleguide](https://github.com/orbiting/styleguide) while modules live in the [publikator-frontend](https://github.com/orbiting/publikator-frontend) repo.*

To finalise the feature, we'll have to make it available to the editors in the Publikator text editor.

In the Publikator we collect different behaviours / elements in so-called [*modules*](https://github.com/orbiting/publikator-frontend/tree/master/components/editor/modules).
A module consists of three things:
- A serializer: A way of transforming MDAST to JSON Slate state and vice versa.  
- UI Components: Buttons, Forms et al
- [A Slate plugin](https://docs.slatejs.org/slate-react/plugins)

The Publikator reads from the same schema as the frontend renderer.
In code, a module is basically a factory function, that gets called with a configuration object and should return a configured API.

The configuration object is a compiled collection of schema values and instantiated child modules:
- `name` - The module name
- `TYPE` - A string, that should get used to name and control related Slate entities.
- `rule` - The actual schema `rule`.
- `subModules` - A list of instantiated modules.

An instantiated module should expose an object of the following shape:
- `helpers`
  - `serializer` - An instance of [`MarkdownSerializer`](https://github.com/orbiting/mdast/tree/master/packages/slate-mdast-serializer)
  - `newItem` - A function that returns a new Slate item
- `plugins` - A list of Slate plugins
- `ui`
  - `textFormatButtons` - A list of React components handling inline text formatting. Mostly toggle buttons tied to marks and inlines.
  - `insertButtons` - A list of React components handling element insertion.
  - `forms`: - A list of React components displaying any additional config elements

A module gets activated by having an `editorModule` key denoting the module on their schema rule. [Here's an example](https://github.com/orbiting/styleguide/blob/v5.73.1/src/templates/Article/index.js#L273).
The same example also shows how you can pass additional data, using the key `editorOptions` on the schema rule. You have both keys available on the `rule` property in your module factory function.

By default all modules get instantiated with `TYPE = moduleName.toUpperCase()`. Module infoBox becomes `INFOBOX`. And because Slate operates on unique types, we have to override this behaviour if we want to reuse existing modules. We can do that by adding the special prop `type` to `editorOptions` in the schema. Here's an example of a [module](https://github.com/orbiting/styleguide/blob/v5.73.1/src/templates/Article/index.js#L160) which is [getting reused](https://github.com/orbiting/styleguide/blob/v5.73.1/src/templates/Article/index.js#L460) [multiple times](https://github.com/orbiting/styleguide/blob/v5.73.1/src/templates/Article/index.js#L221).   

What does that mean for our QA element?

First, we adjust our schema. For the question, we reuse the [headline module](https://github.com/orbiting/publikator-frontend/tree/master/components/editor/modules/heading) and for the answer, we choose the [paragraph module](https://github.com/orbiting/publikator-frontend/tree/master/components/editor/modules/paragraph).

Check the source for more information on what the different properties do. We basically add static text behaviour: non-splitable non-mergeable text blocks.

```
// Somehere in the import section
import { QA } from '@project-r/styleguide'

// definition block
{
  matchMdast: matchZone('QA'),
  component: QA,
  rules: [
    {
      matchMdast: matchHeading(6),
      component: QA.Question,
      rules: globalInlines,
      // editor stuff
      editorModule: 'headline',
      editorOptions: {
        depth: 6,
        isStatic: true
      }
    }
    },
    {
      matchMdast: matchParagraph,
      component: QA.Answer,
      rules: globalInlines,
      // editor stuff
      editorModule: 'paragraph',
      editorOptions: {
        isStatic: true,
        afterType: 'PARAGRAPH',
        insertAfterType: 'CENTER'
      }
    }
  ]
},
```

For our QA element however, we need to write a new module.
As long as we stick to the rules from above, writing modules is pretty free form. First, we tackle the serializer.

```
export const getSerializer = ({ TYPE, rule, subModules }) => {

  const questionModule = subModules.find(m => m.name === 'headline')
  if (!questionModule) {
    throw new Error('Missing question submodule')
  }

  const answerModule = subModules.find(m => m.name === 'paragraph')
  if (!paragraphModule) {
    throw new Error('Missing paragraph submodule')
  }

}
```
