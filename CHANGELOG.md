# Changelog

## [0.0.3](https://github.com/liblaf/github-bot/compare/v0.0.2..v0.0.3) - 2025-08-17

### 🐛 Bug Fixes

- **event-handling:** skip processing events from forked repositories - ([52c44cd](https://github.com/liblaf/github-bot/commit/52c44cd862796cb06f54268e6f3f39dd3f8a679f))
- **workflows:** ensure repository context for changelog generation in on-push workflow - ([c3c06b0](https://github.com/liblaf/github-bot/commit/c3c06b0b63c0fea2faabddbaf22df68fc9e08a70))

### 🔧 Continuous Integration

- remove automerge and extend auto-approve for autofix PRs - ([b666494](https://github.com/liblaf/github-bot/commit/b6664948117d74120367d2f2648e964ccbe254ef))

### ❤️ New Contributors

- [@liblaf-bot[bot]](https://github.com/apps/liblaf-bot) made their first contribution
- [@liblaf](https://github.com/liblaf) made their first contribution
- [@renovate[bot]](https://github.com/apps/renovate) made their first contribution in [#6](https://github.com/liblaf/github-bot/pull/6)

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
