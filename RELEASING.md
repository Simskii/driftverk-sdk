# Releasing the SDK

This repository owns the npm package `@driftverk/sdk`. Make SDK changes here. The SDK directory in the private control-plane repository is the original copy and does not synchronize automatically.

## npm setup

The package is public on npm. Trusted publishing is configured for `Simskii/driftverk-sdk` and `.github/workflows/publish.yml`, with direct publishing allowed. The repository variable `NPM_PUBLISH_ENABLED` is set to `true`.

GitHub Actions uses OIDC to publish without an npm token. The trust configuration can be inspected with `npm trust list @driftverk/sdk`. See [npm's trusted publishing documentation](https://docs.npmjs.com/trusted-publishers/).

## Subsequent releases

Run `npm version patch --no-git-tag-version` for a compatible fix, or choose `minor` or `major` as appropriate. Commit both package.json and package-lock.json with the SDK change and merge to main.

Every pull request and push to main runs runtime tests, TypeScript checks, and a package dry run on Node.js 22 and 24. After checks pass on main, the workflow publishes the version if npm does not already have it. A change without a version bump runs checks but does not publish. Published versions cannot be overwritten.

The workflow can also be run manually on main to retry a failed publication. A registry error fails the run instead of being mistaken for a missing version.
