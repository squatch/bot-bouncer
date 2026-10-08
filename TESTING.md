# Testing

## Automated checks

From the repository root, install the locked dependencies and run the checks:

```sh
npm ci
npm test
npm run build
npm run lint
```

`npm test` runs the unit tests with Vitest. The build runs TypeScript against
`tsconfig.build.json`, and lint runs ESLint.

## Testing on Devvit

Yes. You can playtest the app on a dedicated test subreddit without publishing
it to the app directory. Install and log in to the Devvit CLI, make sure your
Reddit account can install apps on the test subreddit, then run:

```sh
devvit login
devvit playtest r/<your-test-subreddit>
```

Playtest installs the development version on that subreddit and keeps the
session open, updating the installed version as you save code changes. Stop the
session when finished. Use a subreddit created for testing, not a production
community: Bot Bouncer reacts to real subreddit activity and can remove content
or ban users according to the app's settings. Test only with accounts and
content you control, and configure the test subreddit conservatively.

The `deploy` npm script is not the playtest workflow. It runs
`devvit publish && devvit install botbouncer`, so it publishes the app before
installing it. Do not use it just to test code changes.

## Logs

The existing `npm run logs` script streams recent verbose logs for the
`botbouncer` target configured in that command. For another test subreddit,
use the Devvit CLI logs command with that subreddit as its target:

```sh
devvit logs r/<your-test-subreddit> --verbose --since 5m
```
