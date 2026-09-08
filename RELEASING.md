# Releasing the SDK

This repository owns the npm package `@driftverk/sdk`. Make SDK changes here. The SDK directory in the private control-plane repository is the original copy and does not synchronize automatically.

## One-time npm setup

1. Sign in to an npm account that can publish under the `@driftverk` scope. Create or join that npm organization if needed.
2. From this checkout, run `npm ci`, `npm login`, then `npm publish --access public`. Complete npm's authentication prompt. This creates version 0.1.0.
3. In the npm package settings, add a GitHub Actions trusted publisher with these exact values:
   - Organization or user: `Simskii`
   - Repository: `driftverk-sdk`
   - Workflow filename: `publish.yml`
   - Environment: leave empty
   - Allowed action: `npm publish`
4. Set the GitHub repository Actions variable `NPM_PUBLISH_ENABLED` to `true`.
5. Update the README and the website SDK installation guide once the npm package is available.

Trusted publishing uses GitHub OIDC. No npm token is stored in this repository or in GitHub secrets. See [npm's trusted publishing documentation](https://docs.npmjs.com/trusted-publishers/).

## Subsequent releases

Run `npm version patch --no-git-tag-version` for a compatible fix, or choose `minor` or `major` as appropriate. Commit both package.json and package-lock.json with the SDK change and merge to main.

Every pull request and push to main runs runtime tests, TypeScript checks, and a package dry run on Node.js 22 and 24. After checks pass on main, the workflow publishes the version if npm does not already have it. A change without a version bump runs checks but does not publish. Published versions cannot be overwritten.

The workflow can also be run manually on main to retry a failed publication. A registry error fails the run instead of being mistaken for a missing version.
