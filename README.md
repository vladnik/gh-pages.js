GitHub Pages JS
========

Create a beautiful API documentation in no time using Markdown and beautiful Slate template.

Features
------------

* **ZERO! dependencies** - just download release, point at your repo and push as gh-pages branch

* **INSTANT Github Pages update** - change documentation in your project and see how GitHub Pages displays changes instantly without redeploy (Warning! Be aware of [GitHub Rate Limiting](https://developer.github.com/v3/#rate-limiting))

* **Remote or Local mode** - Application supports fetching documentation files directly from your GitHub repo or just using local files

* **Clean, intuitive design** — with Slate, the description of your API is on the left side of your documentation, and all the code examples are on the right side. Inspired by [Stripe's](https://stripe.com/docs/api) and [Paypal's](https://developer.paypal.com/webapps/developer/docs/api/) API docs. Slate is responsive, so it looks great on tablets, phones, and even print.

* **Everything on a single page** — gone are the days where your users had to search through a million pages to find what they wanted. Slate puts the entire documentation on a single page. We haven't sacrificed linkability, though. As you scroll, your browser's hash will update to the nearest header, so linking to a particular point in the documentation is still natural and easy.

* **Slate is just Markdown** — when you write docs with Slate, you're just writing Markdown, which makes it simple to edit and understand. Everything is written in Markdown — even the code samples are just Markdown code blocks!

* **Write code samples in multiple languages** — if your API has bindings in multiple programming languages, you easily put in tabs to switch between them. In your document, you'll distinguish different languages by specifying the language name at the top of each code block, just like with Github Flavored Markdown!

* **Out-of-the-box syntax highlighting** for [112 languages](https://highlightjs.org/), no configuration required.

* **Automatic, smoothly scrolling table of contents** on the far left of the page. As you scroll, it displays your current position in the document. It's fast, too. We're using Slate at TripIt to build documentation for our new API, where our table of contents has over 180 entries. We've made sure that the performance remains excellent, even for larger documents.

* **Let your users update your documentation for you** — by default, your Slate-generated documentation is hosted in a public Github repository. Not only does this mean you get free hosting for your docs with Github Pages, but it also makes it's simple for other developers to make pull requests to your docs if they find typos or other problems. Of course, if you don't want to, you're welcome to not use Github and host your docs elsewhere!

Getting Started with GitHub Pages JS
------------------------------------

1. Download latest release of the [gh-pages.js](https://github.com/vladnik/gh-pages.js/releases/tag/v0.0.2)
2. Unpack archive and change config.js to match your needs
3. Push resulting files as gh-pages branch of your application

Configuration
-----------------

Application is using config.json for initial configuration.

    {
      "repo": "vladnik/gh-pages.js",
      "main": "index.md",
      "local": false
    }

* repo: your GitHub project url
* main: main documentation file
* local: get markdown files from GitHub repo or from current directory

Main documentation file should start from next lines:
```
---
title: API Reference

language_tabs:
  - shell
  - ruby
  - python

toc_footers:
  - <a href='#'>Sign Up for a Developer Key</a>
  - <a href='https://github.com/vladnik/gh-pages.js'>Documentation Powered by GitHub Pages JS</a>

includes:
  - docs/errors.md
---
```
* title: page title
* language_tabs: list supported languages
* toc_footers: list of ToC footers
* includes: list of documentation files to include

See https://github.com/vladnik/gh-pages.js/blob/master/index.md for example

Special Thanks
----------------

Project is heavily based on [Slate](https://github.com/tripit/slate) project.
