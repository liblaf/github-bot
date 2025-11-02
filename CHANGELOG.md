# Changelog

## [0.1.0](https://github.com/liblaf/github-bot/compare/v0.0.5...v0.1.0) (2025-11-02)


### ⚠ BREAKING CHANGES

* Webhook endpoints have been consolidated - all GitHub webhooks now use `/api/github/webhooks` endpoint instead of separate endpoints for bot and release-please

### ✨ Features

* **api:** Add global error handling for OpenAPI routes ([130ebd9](https://github.com/liblaf/github-bot/commit/130ebd9557302fcaf2c412b7ed6e606cf7895b0c))
* **bot:** add automated repository setup and refine workflow dispatch ([3dd6607](https://github.com/liblaf/github-bot/commit/3dd6607ccc03078ef5b740f6988933f9b3c2a605))
* **bot:** Introduce Bot app for repository management and auto-approval ([cfe4e74](https://github.com/liblaf/github-bot/commit/cfe4e74186c62c16841b57f6e5660090c99703cc))
* implement MegaLinter integration with GitHub check runs ([34af97b](https://github.com/liblaf/github-bot/commit/34af97b48aee09b18fb766cf12136618f7043c36))
* **release-please:** Implement Release Please GitHub App and workflow orchestration ([2021a02](https://github.com/liblaf/github-bot/commit/2021a0277399b28b182604cb3acd259aae830f84))
* **release-please:** integrate GitHub Check Runs for release process visibility ([84434e1](https://github.com/liblaf/github-bot/commit/84434e1b5491d2f9dd27fdaa61798e29111a53db))
* **schedule:** introduce weekly automation schedule ([94b2690](https://github.com/liblaf/github-bot/commit/94b2690cd96e791594a5b66bdd6bc055e175b9df))


### 🐛 Bug Fixes

* **bot-release-please:** Provide GH_TOKEN for gh api calls ([8f481f8](https://github.com/liblaf/github-bot/commit/8f481f8b1638f7500eafdc2037025974eb3d5b84))
* **bot:** Add delay before approving pull requests ([cb651c7](https://github.com/liblaf/github-bot/commit/cb651c7f276dafb5642650e92ddc5ce18ed0fbf2))
* **ci:** Correct REPO environment variable in bot-release-please workflow ([22ccaa0](https://github.com/liblaf/github-bot/commit/22ccaa05ac930e1ea45deb6b400f980c77a05650))
* **ci:** Correctly update GitHub check runs in bot-release-please workflow ([0a3c46b](https://github.com/liblaf/github-bot/commit/0a3c46b7efbbfb9c94bcfb249bd15eb899ebf3c8))
* **ci:** Ensure GH_TOKEN is available for MegaLinter environment setup ([47d627f](https://github.com/liblaf/github-bot/commit/47d627f22d1694300048b2f3f6dc35d267cc2072))
* **misc:** Await repository dispatch event creation ([2fa324d](https://github.com/liblaf/github-bot/commit/2fa324d3ef9e18e9397918cf9f9dc0539ab7d51f))
* **misc:** Correct environment variable usage for Misc GitHub App ([ad6fea5](https://github.com/liblaf/github-bot/commit/ad6fea58edd493dcaf42e8b50a5fee0c823c5050))
* **release-please:** Prevent workflow dispatch on non-default branches ([6094cde](https://github.com/liblaf/github-bot/commit/6094cdea19de17536247dbe3660564aed827f0df))
* **repo-settings:** Remove explicit forking allowance ([ca409fc](https://github.com/liblaf/github-bot/commit/ca409fcd6f396f2f2a8f70e5a5e628d42738110e))
* **routes:** add error handling middleware for OpenAPI routes ([ae817a7](https://github.com/liblaf/github-bot/commit/ae817a7e0511989836c5bbc8276214fcb0eb3ae3))


### ♻️ Code Refactoring

* **dispatch:** Extract dispatch Octokit creation to utility ([e96fc36](https://github.com/liblaf/github-bot/commit/e96fc36b74cd7f3d7a76947a2d95d07c6aa10377))
* **github-bot:** Improve repository settings sync and token usage ([b019f30](https://github.com/liblaf/github-bot/commit/b019f305f011188674401438008aab1d4a22d96f))
* restructure application architecture and improve GitHub integration ([10103dd](https://github.com/liblaf/github-bot/commit/10103ddb1cebd2dfb7ee7d83314f03323d489c72))
* **src/apps/main.ts:** disable MegaLinter and ReleasePlease integrations ([b8bd965](https://github.com/liblaf/github-bot/commit/b8bd9657f989fbb30a6048711b50024552810089))


### ⚙️ Continuous Integration

* **bot-copier-update:** Add checkout step for copier update ([83adf73](https://github.com/liblaf/github-bot/commit/83adf73f6960325430c5e88f65657c47e3432e5c))
* **bot-mega-linter:** add run-name for better workflow identification ([c40b18f](https://github.com/liblaf/github-bot/commit/c40b18fad764051e22f730bcdd6375888b53e589))
* **bot-release-please:** Consolidate `FORCE_COLOR` and improve check run conclusion logic ([a4f64ee](https://github.com/liblaf/github-bot/commit/a4f64eee092e28b151f3a4aa0cace759ab9eb857))
* **bot-sync-repo-settings:** add environment setup for MegaLinter and Release Please ([0eb73ec](https://github.com/liblaf/github-bot/commit/0eb73ecec20f55c5a92e70b69fdb81531b670f9e))
* force color output for gh api commands ([b641533](https://github.com/liblaf/github-bot/commit/b6415338f965e9cada528f55ce40645a89df1555))
* regenerate GitHub tokens in workflows ([92275d1](https://github.com/liblaf/github-bot/commit/92275d11109b089b31b18ac7c906986baa7f2c0a))
* **release-please:** Fix condition for changelog PR job ([ad9cdf9](https://github.com/liblaf/github-bot/commit/ad9cdf9a87f5afa1fc966e258fef0768773cc944))
* **repo-settings:** Add workflow to synchronize repository settings ([9bd2627](https://github.com/liblaf/github-bot/commit/9bd2627449bc74910f6c854eb062b0a54cd1bf27))
* **sync-repo-settings:** configure repository settings ([541d810](https://github.com/liblaf/github-bot/commit/541d81044de9a570f5f1d513a39ee68d7707d537))

## [0.0.5](https://github.com/liblaf/github-bot/compare/v0.0.4..v0.0.5) - 2025-09-07

### 🐛 Bug Fixes

- **pull-request:** add concurrency configuration to prevent duplicate workflow runs - ([fb747b0](https://github.com/liblaf/github-bot/commit/fb747b0830833f9353b328d16e6bc3747e929868))

### 🔧 Continuous Integration

- **workflows:** add PyPI environment creation and update job dependencies - ([8ff025c](https://github.com/liblaf/github-bot/commit/8ff025c5ea8d1c90b73fa1d59b3366dc6bb270cf))

### ❤️ New Contributors

- [@liblaf-bot[bot]](https://github.com/apps/liblaf-bot) made their first contribution
- [@liblaf](https://github.com/liblaf) made their first contribution
- [@renovate[bot]](https://github.com/apps/renovate) made their first contribution in [#11](https://github.com/liblaf/github-bot/pull/11)

## [0.0.4](https://github.com/liblaf/github-bot/compare/v0.0.3..v0.0.4) - 2025-08-24

### 🔧 Continuous Integration

- **release-please:** switch to community-maintained fork - ([487b761](https://github.com/liblaf/github-bot/commit/487b761ab5768f81f6dff58bc96dd054a3fedf47))

## [0.0.3](https://github.com/liblaf/github-bot/compare/v0.0.2..v0.0.3) - 2025-08-17

### 🐛 Bug Fixes

- **event-handling:** skip processing events from forked repositories - ([52c44cd](https://github.com/liblaf/github-bot/commit/52c44cd862796cb06f54268e6f3f39dd3f8a679f))
- **workflows:** ensure repository context for changelog generation in on-push workflow - ([c3c06b0](https://github.com/liblaf/github-bot/commit/c3c06b0b63c0fea2faabddbaf22df68fc9e08a70))

### 🔧 Continuous Integration

- remove automerge and extend auto-approve for autofix PRs - ([b666494](https://github.com/liblaf/github-bot/commit/b6664948117d74120367d2f2648e964ccbe254ef))

## [0.0.2](https://github.com/liblaf/github-bot/compare/v0.0.1..v0.0.2) - 2025-08-10

### 🐛 Bug Fixes

- **ci:** standardize variable naming and usage - ([4879736](https://github.com/liblaf/github-bot/commit/48797361e42c21a707872b5bab09be3af10ceff6))
- **workflows:** correct repository variable references - ([4f821f9](https://github.com/liblaf/github-bot/commit/4f821f9c95af6f7ceac85b3785618247606d56f6))

### 📝 Documentation

- **workflows:** clarify cron schedule timing - ([104990a](https://github.com/liblaf/github-bot/commit/104990a06220ff2915a0882d01377002253d15eb))

### 🔧 Continuous Integration

- **repository:** add DockerHub secrets and variables - ([f31b7a4](https://github.com/liblaf/github-bot/commit/f31b7a4aceaf12afed8da35e4795c3c70f08ba66))
- **workflows:** make owner and ref inputs optional in push workflow - ([a2a057e](https://github.com/liblaf/github-bot/commit/a2a057ed9bb7facf40cbdfd322527d89d1335131))
- **workflows:** improve repository creation workflow - ([a75524e](https://github.com/liblaf/github-bot/commit/a75524ed6e0e0be5a86e11a9061c8ad9175370a4))
- update GitHub Actions references - ([14cb2f0](https://github.com/liblaf/github-bot/commit/14cb2f0953350fc9a1ac8756f633493559a5729b))

### ❤️ New Contributors

- [@renovate[bot]](https://github.com/apps/renovate) made their first contribution in [#5](https://github.com/liblaf/github-bot/pull/5)

## [0.0.1](https://github.com/liblaf/github-bot/compare/v0.0.0..v0.0.1) - 2025-08-04

### ✨ Features

- **webhooks:** add push event support - ([ce25708](https://github.com/liblaf/github-bot/commit/ce25708a620c9caba7b3cb4c0fde470dfe8e9880))
- **workflows:** add auto-review for Renovate PRs - ([b964918](https://github.com/liblaf/github-bot/commit/b96491854f31b7e769dafe2177381a99715dabe3))

### 🐛 Bug Fixes

- **webhooks:** truncate large PR body payloads - ([612e013](https://github.com/liblaf/github-bot/commit/612e0134fd2282d2323a3d7256934b650d0c8a6b))

### ♻ Code Refactoring

- **workflows:** standardize naming and pre job - ([01ca636](https://github.com/liblaf/github-bot/commit/01ca63642f9f9285f84bc153e75ccbaf63a626af))
- **workflows:** consolidate PR workflows - ([b60387f](https://github.com/liblaf/github-bot/commit/b60387f3ea65949994af5da17a1d252cf9fd6f76))

### 🔧 Continuous Integration

- **workflows:** add concurrency control and cleanup - ([a2f0f45](https://github.com/liblaf/github-bot/commit/a2f0f4511f32810d6f49dc3f1f7921133e21b904))
- update auto-merge workflow configuration - ([8c3e0bd](https://github.com/liblaf/github-bot/commit/8c3e0bdaa8e9a36ad4852d7af17738799808650e))
- add scheduled workflow for repository settings sync - ([e3f49e0](https://github.com/liblaf/github-bot/commit/e3f49e0319ef3405933829a288e7cdd56ff52eac))
- migrate to actions-ts for auto-approve workflows - ([62d8075](https://github.com/liblaf/github-bot/commit/62d80757960d9bfb68f6551600eea3486a97e2a5))
- add auto-approve workflow for release-please and renovate - ([a5b2f30](https://github.com/liblaf/github-bot/commit/a5b2f3039d02290beda5c6f6c34b64a67ec1ac31))
- add changelog generation for PRs and releases - ([3bcf0da](https://github.com/liblaf/github-bot/commit/3bcf0da9fedea794017b66bea6aef53c579fa747))
- add pull request workflow and improve repository workflow - ([4ec26ea](https://github.com/liblaf/github-bot/commit/4ec26ea811682817ec0652828771e6ef9663d770))

### ❤️ New Contributors

- [@github-actions[bot]](https://github.com/apps/github-actions) made their first contribution in [#3](https://github.com/liblaf/github-bot/pull/3)

## [0.0.0] - 2025-08-03

### ✨ Features

- **workflows:** support workflow_dispatch and workflow_call triggers - ([9390d77](https://github.com/liblaf/github-bot/commit/9390d777824baf6e9f246b42dc4fcabd8ce493f0))
- initial project setup for GitHub bot - ([e8e00f0](https://github.com/liblaf/github-bot/commit/e8e00f0091ed1352db69d646137b47a8698fe378))

### 🐛 Bug Fixes

- **workflow:** correct repository payload property access - ([e5dba60](https://github.com/liblaf/github-bot/commit/e5dba60d3faa8f54bc8bd408b59481d7aafe5b5a))

### 👷 Build System

- configure module exports and types - ([c16a7e0](https://github.com/liblaf/github-bot/commit/c16a7e00d84ddbaf5a743f899a84219937f20092))

### 🔧 Continuous Integration

- add repository.created workflow - ([058a281](https://github.com/liblaf/github-bot/commit/058a281fbcc15d6786de155e4570623d9ef648fe))

### ❤️ New Contributors

- [@liblaf-bot[bot]](https://github.com/apps/liblaf-bot) made their first contribution in [#1](https://github.com/liblaf/github-bot/pull/1)
- [@liblaf](https://github.com/liblaf) made their first contribution
