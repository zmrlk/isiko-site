# ISIKO public website

Deployment package for [isiko.pl](https://isiko.pl/).

The reviewed site is in `dist/`. Files at the repository root outside this folder are historical and are not served. The Worker configuration deliberately limits deployment to `dist/`.

## Verify and publish

```sh
node scripts/verify-release.mjs
npx wrangler deploy
```

Wrangler also runs the verifier before publishing. `release-manifest.json` records every reviewed public file by SHA256. Update the package and manifest together after building and reviewing the editable source project; do not edit generated HTML directly.

The 12 October 2026 package retains the approved process-story design, removes service prices, updates the company contact layout, and includes three current CRM views with separate desktop and mobile screenshots using synthetic data. The ten site languages describe the screenshots as Polish-language UI. The B2B demonstration is isolated and does not send real orders.

Only public website files belong here. Application source code, client databases, credentials, private review evidence and local capture fixtures are excluded.
