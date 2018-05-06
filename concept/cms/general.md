# General considerations

We want to start with some wording, thoughts and axioms we build upon.

## Tooling is key

One could ask: Why should we invest into building tools that most of our customers will never see or use. We think that tooling is key and therefore should receive a lot of attention, thought and resources. Because the tools one uses to produce a product influence the product a lot. They do obviously play an important role on how efficient something can be produced, but also what can be produced and, even more importantly, what will be produced. What is easy to do with a given set of tools is more likely to be done. In our case we are talking about using different formats, ensuring quality control, collaboration etc. No tool is good by itself, but only in the hands of someone mastering it. And for every use case and every set of hands another set of tools is perfect.

## What we aim to optimize

There are two distinct things we want to optimize with our tooling.

1. Efficiency. There are many tasks involved in the production of an article. Some can directly be automated \(for example correct representation of numbers\) and this will save a lot of work down the road. Many of these tasks cannot be automated, but must be done by specific people in a specific order. Properly visualizing - and in some cases enforcing - this production flow will reduce the work for the people managing it.

2. Creative collaboration. People working together are more likely to produce excellent, creative and surprising output. So we want to build tools that help journalists to work together. We cannot automate or enforce creativity, but we can build an environment that enables and promotes it.

## The word CMS

CMS is the acronym of Content Management System. It is a very general word, used for many very different use cases, such as building the website for a small restaurant, managing all web-content of Migros with hundreds of campaigning websites, millions of product descriptions etc., publishing a personal blog or administer the content of an online shop. Well and everybody understands something different when using it. What we actually need is a PMS, a publication management system \(it's like a subset of CMS\). This word is more precise because we manage a journalistic publication and not generic content. We do not build a tool to build a website \(where you can modify the menu-structure or add a footer\) but one where you can produce content to be published on a elsewhere "static" website and other channels. Think of an envelop that is provided by your coders and designers which provides an editor to write articles in - the main dynamic content. Despite the shortcomings of the word CMS we decided to continue to use it, because it is not wrong and very established. We will specify later what exact features we need in our CMS.

## Flexibility

We do not know exactly how our content will look like, nor how it is going to be produced, nor who is going to be part of our universe as readers, contributors, editors etc. While we can anticipate some of these factors, most of them we simply can't. We can make assumptions and plan accordingly \(and it is very important to make the best assumptions possible\) but eventually we will have to adapt. This implies, that we have to stay flexible. For us, this means:

* We need to store the content independently from it's representation so we can change everything related to styling and design whenever and however we like.
* We need to build a backend that can serve our content to other/new channels \(a new social network, another website etc.\)
* We need a modular system in which we can add new types of content-blocks for the stories \(two-click-vote, a table, an embed from this new, yet to be known social network etc.\) without any pain.

## Who is the user

The primary user of our CMS is the editorial staff of Republik. Then there are all the freelancers, correctors, AD's etc. We also suppose that there are going to be experts who do not write articles, but use the CMS to do fact-checking or collect ideas and feedback on articles that are in production.

We want to keep the technical separation of insiders and outsiders as small as possible, so that it is very easy to give a specific reader access to parts of the CMS. And that we can open tools originally developed for redactors to readers \(say, for example, commenting specific paragraphs of an article\). This requirement implies that we have one user-database and that we manage the access rights through roles and user-groups.

## Functions of our CMS

This part is a little bit technical, but very useful for a deeper understanding of the problems we have to solve. In the following we introduce a lot of words, eventually used again in this document. All the parts listed below together form our CMS.

Client-side \(what users are going to interact with\):

* Editor \(to manipulate one article\)
* Management of Versions \(while an article is written and produced, different versions are created - more on that later\)
* Production-Flow-Management-Tools \(articles have to be created, fact-checked, corrected etc. this workflow needs to be visualized and partially enforced\)
* Content-Output-Management-Tools \(after an article is finished, it has to be published to different channels\)
* Reactions-Management-Tools \(for example comments from colleagues, comments from readers\)
* Assets \(images, CSV files...\) Management-Tools \(including things as source and copyright management\)
* Performance-Measurement-Tools \(how many people did open the article, how long did they stay on the page etc.\)

Server-Side \(things that need to be taken care of in the background\):

* Storage \(we somehow need to store all the content, published or not, produced by editors or readers\)
* Relations \(different content is stored with certain relations to each other—for example there is a relation between an article and the user who wrote it\)
* Indexing \(to facilitate fast information retrieval\)
* Triggers \(functions the servers applies to content before storing it or sending it somewhere\)
* API \(an interface for other software \(for example the client-side\) to access stored information and send information to the server\)
* Auth \(a system that manages the user-accounts and gives them access to certain functions or content depending on their role\)

Next: [What we want to build](./plan.md)
