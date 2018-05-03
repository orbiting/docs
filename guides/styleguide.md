# Adding a styleguide component

We use a public [styleguide](https://styleguide.republik.ch) for maintaining, documenting and demoing a library of [React components](https://reactjs.org/docs/react-component.html).

## Before you add a new component
* Confirm whether the styleguide is actually the right place for your component. It should
  * be generically usable
  * have been designed
  * be used in more than one place (same app, two places can count too)
* [Set up the styleguide](https://github.com/orbiting/docs/blob/master/guides/how-to-run.md#3-setup-the-styleguide) repository locally. 


## Step by step
1. Start a new branch for your component:
  <br />```git checkout -b mycomponent```
2. Set up these files in `/src/components/MyComponent/`:<br />
    * `index.js`: Either contains the main component, or exports all components of that namespace
    * `docs.md`: Documents the public API and various states of the component
    * Any further subcomponents or utility files you need
3. Set up the path to your catalog page and its dependencies in `src/index.js`. You should now be able to view your new catalog page at e.g. http://localhost:3003/mycomponent.
4. Export your component  in `src/lib.js` for use in consuming repos.
5. Implement your component. 
6. You may want to test your component in a consuming frontend by [linking it locally](https://github.com/orbiting/docs/blob/master/guides/how-to-run.md#linking).
7. Commit your changes, following the [commit message format](https://github.com/orbiting/styleguide#commit-message-format), e.g.
    * `feat(MyComponent): Initial version`
    * `fix(MyComponent): layout issues on mobile`
8. When you’re happy with your component, push your commits to the remote branch:
  <br />```git push origin mycomponent```
9. Create a pull request.
    * Give context by describing the new feature, adding screenshots or referencing related pull requests, if any.
    * Assign another developer for review.
10. Implement, commit and push changes requested during the review until the reviewer is happy.
11. “Rebase and merge” your pull request into master.
12. The master branch will be auto-released within minutes. The version number of the release is automatically determined according to the commit messages.
13. Bump the styleguide version in the consuming frontend repo’s `package.json` to use the new component.


## Best practices
* Make your component as generic and flexible as needed, but don’t over-generalize.
* Use [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) for any non-trivial component.
* Break down subcomponents into separate files where possible.
* Reuse or add new font cuts to `/src/components/Typography/styles.js`
* Reuse colors from `/src/theme/colors.js` where possible.
* Unit test logic in util and lib files, at the very least.
