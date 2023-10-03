# Contributing to Gasteroids

I'm really glad you want to contribute to this little project! Before you continue, here are some things you have to take into consideration:

- This project uses **vanilla** JavaScript
- This project uses **[P5JS](https://p5js.org/)** a JavaScript library used primarily for creative coding

## Where do I start?

**Before** forking the project, see the list of issues and ask to be assigned to one of them. If you think you could do something equally interesting that is not listed there,
open a new issue.

### Local setup

1. Star this project ⭐
2. Create a fork of this project 🍴
3. Download your version of the project ⬇️
```
git clone https://github.com/<YOUR_GITHUB_USERNAME>/gasteroids.git
```

From there you will need to start a local server from where to access the index.html file (in order to properly load up the resources).
The easiest way to do this is to download the [LiveServer extension on Visual Code](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

### Committing changes

This project aims to be beginner friendly for those who are making their first steps contributing to Open Source projects, hence, it is **imperative** that you:

- Use a consistent code style
- Use semantic function names
- Make explicit comments inside your functions that explains what does it do

If you think your changes meets the previous requirements *and* it solves one of the listed issues, go ahead and **commit** your changes in a separate **branch** using the
following commands:

```
git checkout -b <NAME-OF-THE-ISSUE-SOLVED>
git add .
git commit -m "(Add|Fix|Feature): <YOUR-COMMENT>"
```

Additionally, if your contribution introduces a new functionality to the application, make sure to write about it on the [**Improvements** section on the README file](https://github.com/DevTony101/gasteroids#improvements).

### Pushing changes

When you are ready, push your changes to GitHub using the following command:

```
git push origin <NAME-OF-THE-ISSUE-SOLVED>
```

And afterwards create a new **pull request** as explained in [these instructions](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork).
