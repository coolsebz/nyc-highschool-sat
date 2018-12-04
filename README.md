## NYC High School and SAT Scores List


Live url: https://coolsebz.github.io

### Running the project

Clone the repository
`npm install` and then `npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Overall organisation of the project

Has two main pages, one for the list of high schools and one where you can compare selected highschools.
The information is provided via a separate worker that does the aggregation and then held into a react context for the components to plug into.

Also using [https://material-ui.com](material-ui) for the project, with a minimal amount of styles needed on top of that.

### Tests

In the interest of time, I wrote tests for some of the more interesting parts of the school listing part of the app, such as the edge cases in the worker (in the dataset there's some values that wouldn't make sense to display), the SAT score table for a school, and the information component overall.

---

#### Future improvements

There's still a few things I would've wanted to get to do but felt a bit short on time for, such as:
- There are some responsiveness quirks that I would've loved to fix
- Add Search directly in the app
- More metrics to compare (eg: compare school vs mean, per student metrics, geographical heatmap, etc)
- In-between-visits storage of selected high schools for comparison
- Add a Google Maps integration for linking the location of a school directly

Similarly, before moving this project to be a real production app, I would want to:
- Add support for translations and localisation
- Introduce code splitting (especially since we have quite separate routes in the app)
- Improve the matching mechanism between a school and scores (really naive right now) and move it to an API
- HTTPS for the app, add CSPs for resources, move assets to CDN
