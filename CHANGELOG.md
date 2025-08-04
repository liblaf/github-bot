# Changelog

## [0.0.1](https://github.com/liblaf/github-bot/compare/v0.0.0...v0.0.1) (2025-08-04)


### ✨ Features

* **webhooks:** add push event support ([ce25708](https://github.com/liblaf/github-bot/commit/ce25708a620c9caba7b3cb4c0fde470dfe8e9880))
* **workflows:** add auto-review for Renovate PRs ([b964918](https://github.com/liblaf/github-bot/commit/b96491854f31b7e769dafe2177381a99715dabe3))


### 🐛 Bug Fixes

* **webhooks:** truncate large PR body payloads ([612e013](https://github.com/liblaf/github-bot/commit/612e0134fd2282d2323a3d7256934b650d0c8a6b))


### ♻ Code Refactoring

* **workflows:** consolidate PR workflows ([b60387f](https://github.com/liblaf/github-bot/commit/b60387f3ea65949994af5da17a1d252cf9fd6f76))
* **workflows:** standardize naming and pre job ([01ca636](https://github.com/liblaf/github-bot/commit/01ca63642f9f9285f84bc153e75ccbaf63a626af))


### 🔧 Continuous Integration

* add auto-approve workflow for release-please and renovate ([a5b2f30](https://github.com/liblaf/github-bot/commit/a5b2f3039d02290beda5c6f6c34b64a67ec1ac31))
* add changelog generation for PRs and releases ([3bcf0da](https://github.com/liblaf/github-bot/commit/3bcf0da9fedea794017b66bea6aef53c579fa747))
* add pull request workflow and improve repository workflow ([4ec26ea](https://github.com/liblaf/github-bot/commit/4ec26ea811682817ec0652828771e6ef9663d770))
* add scheduled workflow for repository settings sync ([e3f49e0](https://github.com/liblaf/github-bot/commit/e3f49e0319ef3405933829a288e7cdd56ff52eac))
* migrate to actions-ts for auto-approve workflows ([62d8075](https://github.com/liblaf/github-bot/commit/62d80757960d9bfb68f6551600eea3486a97e2a5))
* update auto-merge workflow configuration ([8c3e0bd](https://github.com/liblaf/github-bot/commit/8c3e0bdaa8e9a36ad4852d7af17738799808650e))
* **workflows:** add concurrency control and cleanup ([a2f0f45](https://github.com/liblaf/github-bot/commit/a2f0f4511f32810d6f49dc3f1f7921133e21b904))

## [0.0.0] - 2025-08-02

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

- [@liblaf](https://github.com/liblaf) made their first contribution
- [@liblaf-bot[bot]](https://github.com/apps/liblaf-bot) made their first contribution
