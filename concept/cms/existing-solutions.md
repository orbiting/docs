# Overview of existing solutions

This is not an objective or neutral overview, but one that reflects our view and thoughts. We try to go through the possibilities and explain which concepts we find interesting and what problems we see with different existing systems.

## CMS as a Service

A strategy we could follow is not to operate any CMS ourselves at all. Simply use an existing headless CMS as a service, living in the cloud and providing us with an API layer and administration interface. Our front ends could just consume these APIs.

The concept is great but there are currently no services meeting our more advanced requirements. Additionally most services are proprietary software, coming with a set of problems described in the next section. The developments in this area are fast, maybe we're just too early for this road - currently this is not a feasible solution.

## Proprietary vs. Open Source

Well, we have a pretty clear opinion about this question. Besides the fact, that we want to be an open source company ourselves \(in a much broader sense than just open sourcing software\), we see the following problems with proprietary solutions:

* **Vendor Lock-In**: You go the pace of the vendor. If they're slow, you are slow, if they're fast, you need to be fast. They have the ultimate power to decide on the direction or even to shut down further development.
* **Not Verifiable**: If you don't get access to the source code, you are victim to magic. You can't predict what the system does, how sustainable it ist and can't fix bugs yourself or change behaviour according to your needs and demands.
* **Hard to extend**: Most proprietary system offer limited extensibility. Without the right to change all source code you're inherantly limited \(e.g. to a plugin system\).
* **No Full Control**: Besides the source code access problem, legal usage restrictions often limit what you can do. Preventing full control of the system.
* **Overhead**: Proprietary software has to try hard to stay closed, prevent unlicenced usage and/or collecting usage statistics for billing purposes. Thus making the software more complex.

As we want to shape our product ourselves according to our visions accepting these restrictions is not an option. And given that there are many free and open solutions there is really no need to rent/buy a CMS.

## Monoliths and Headless

Many popular CMS are **monoliths**, comparable to an all-in-one printer, they provide multiple functions: frontend, administration interface, backend and optionally an HTTP API layer.

Serving multiple channels and developing each at it's own pace requieres multiple independent front ends. Only monoliths with a strong API can usually support this.

Remaining agile and to be able to exchange and iterate on individual parts and adding extensions like new channels is key. Jamming them all into one unit makes very little sense in the software world. Therefore modern CMS tend to be **headless** — provide no frontend at all and completely focus on the API layer and administration interface.

A strong API enables the easy and fast development of front ends, as smooth as a butler, with the technology and tools best suited for a specific channel.

## Existing OpenSource Solutions

There are many good CMS such as Drupal, MediaWiki, Django CMS and WordPress.

The main problem with these system is that they are based on old programming paradigms and limitations from 10 years ago. Their initial releases date back 10 to 17 years. Old software is not per se bad. There exist for example database systems that started to be developed more than 20 years ago and are still the best solution for many of todays problems. Development of the Linux Kernel started 1991 and today powers, despite other things, all android devices. But these software underwent vast rewrites and constant development by huge numbers of developers from academia and businesses. The mentioned CMS did not. And to make things worse, techniques and technologies around websites are changing very rapidely, with disrupting solutions poping up all the time. Thus realizing contemporary ideas is more complicated and time-consuming within those system than with a more modern fundation.

Another problem with your typical existing CMS is that they use the concept «all-in or nothing» and missing modularity makes it difficult to exchange certain parts with alternative solutions.

### WordPress

Well, we are dedicating WordPress an own paragraph mainly because it has been suggested so many times that we use it. WordPress was initially built as a blogging tool—and is extremely good as such. And it has been so successful that it has been \(ab\)used to more or less any imaginable use-case.

Issues

* initial release was May 27th 2003
* it is a monolith \(see above\)
* written in PHP, not our favorite language
* it is plagued with [security issues](https://en.wikipedia.org/wiki/WordPress#Vulnerabilities), while the core has stabilized plugins are often still problematic
* it's still only a blogging system, everything else is glued on top

We have different requirements to a blog:

1. We have multiple channels \(newsletter, social media, SMD, mobile app and possibly many more in the future\) that need to be served out of one publication system.
2. We have different roles working together: readers, writers, fact checkers, publication managers and possibly many more roles down the road.
3. We are a payed product. We need paywall functionalities.
4. We have a much broader variety of formats: an interview looks differently from an essay, video may play an important role, we'll have interactive and data driven stories, photo intensive articles have a different layout than a simple text.
5. We're building social functionality for our users. They are not only here to read and eventually comment—they should have specific and evolving possibilities to interact with the content, each other and the authors.

Given the requirements and issues we have with WordPress we do **not** believe it would be wise to bet our future on it.

## Conclusion

So in the end it comes to the question: do we want speed up development in the beginning by using something existing as fundament and use the time later to try to bend it to what we actually want or do we rather invest more time in the beginning to get a functioning system and then have the freedom to do what we want?

Many other projects are forced to choose the first option, because they simply lack investment \(or do not know enough about what their customers want\). So they have to do something quick-and-dirty in order to live. We are lucky not to be in this situation. We do have a lot of development resources now and we have to use them to do the best possible with it—and this is not using one of the above mentioned solutions.

Tools are good if they fit in the hands of the users. Tools that exist already where either built for a specific use-case \(never exactly ours\) or are general purpose tools that we could apply to our use-case. But Republik is not a generic use-case that can be full filled with a general purpose tool. And we've determined that bending a general purpose CMS to our use-case will end up slowing us down more than we would benefit from using it.

We are writing this to explain why we consider it absolutely possible to develop a CMS with the resources we have that is going to be better for us than using the general purpose system that so many more other developers—just as good as we are, many surely better—have worked on. They spent their time either developing with another use-case in mind \(which is nice, but not very useful for us\) or they worked on layers of abstraction to give people with less development resources good tools \(which is awesome, but not for us\).

We do certainly not build everything from scratch. We intend to take good modern open source software to build our system. We just go one layer deeper: we are going to take an existing editor, and existing production-workflow-tool, an existing versioning software, an existing storage system etc. And put them together to a system that satisfies our needs, while being quite under our control and very flexible.

Next: [For the administration](../admin.md)
