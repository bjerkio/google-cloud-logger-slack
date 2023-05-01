# Changelog

## [3.1.0](https://github.com/bjerkio/google-cloud-logger-slack/compare/v3.0.0...v3.1.0) (2023-05-01)


### Features

* add docker setup ([327a77d](https://github.com/bjerkio/google-cloud-logger-slack/commit/327a77d03e0f48b6a97ae6324c751a3d71b5bdaa))

## [3.0.0](https://github.com/bjerkio/google-cloud-logger-slack/compare/v2.0.1...v3.0.0) (2023-04-30)


### ⚠ BREAKING CHANGES

* Drops support for `makePubSubServer`. See https://github.com/simenandre/pubsub-http-handler/pull/255
* Dropping axios in favor of undici might break tests. For example, if using nock. See https://github.com/nock/nock/issues/2183

### Features

* improve log parser ([b107e89](https://github.com/bjerkio/google-cloud-logger-slack/commit/b107e89bed4d8aa0f69e85040e20185c4537db15))


### Code Refactoring

* bump pubsub-http-handler to v5 ([a7bf4a7](https://github.com/bjerkio/google-cloud-logger-slack/commit/a7bf4a7ebdf9364b04caff723d955ca5b0287ed6))
* drop axios for undici/fetch ([4b3de5b](https://github.com/bjerkio/google-cloud-logger-slack/commit/4b3de5b8b8e482ed5987e41ee3080059a1060a73))

### [2.0.1](https://www.github.com/bjerkio/google-cloud-logger-slack/compare/v2.0.0...v2.0.1) (2023-02-12)


### Bug Fixes

* require channel to be set for api method ([7d512b6](https://www.github.com/bjerkio/google-cloud-logger-slack/commit/7d512b6a81a351d71c8cc4bfe46e1d1210d9d2ce))

## [2.0.0](https://www.github.com/bjerkio/google-cloud-logger-slack/compare/v1.5.0...v2.0.0) (2022-06-13)


### ⚠ BREAKING CHANGES

* Upgrade to pubsub-http-handler@v4

### Features

* Upgrade to pubsub-http-handler@v4 ([5acf179](https://www.github.com/bjerkio/google-cloud-logger-slack/commit/5acf17943cd27244892337524a73741e2c832b31))

## [1.5.0](https://www.github.com/bjerkio/google-cloud-logger-slack/compare/v1.4.0...v1.5.0) (2022-04-12)


### Features

* Add support for gcl-slack producer ([a11c6cb](https://www.github.com/bjerkio/google-cloud-logger-slack/commit/a11c6cb014241f26d94bc9359f3a13e15feade45))

## [1.4.0](https://www.github.com/bjerkio/gcl-slack/compare/v1.3.0...v1.4.0) (2021-09-28)


### Features

* Add options for apiOptions to PulumiCallback ([c818444](https://www.github.com/bjerkio/gcl-slack/commit/c818444b4c931509373d7b28a58f287a73f1fd5e))

## [1.3.0](https://www.github.com/bjerkio/gcl-slack/compare/v1.2.2...v1.3.0) (2021-09-28)


### Features

* Add options for `apiOptions` to PulumiCallback ([3036dae](https://www.github.com/bjerkio/gcl-slack/commit/3036dae42f47ed6b6ed22d8a46c7769cf844f033))

### [1.2.2](https://www.github.com/bjerkio/gcl-slack/compare/v1.2.1...v1.2.2) (2021-09-15)


### Bug Fixes

* require minimum node@v10 ([e3cd75d](https://www.github.com/bjerkio/gcl-slack/commit/e3cd75d52fc57f34506b1bf7f96cd7599f578998))

### [1.2.1](https://www.github.com/bjerkio/gcl-slack/compare/v1.2.0...v1.2.1) (2021-09-15)


### Bug Fixes

* Release issues ([6cf7bfd](https://www.github.com/bjerkio/gcl-slack/commit/6cf7bfda45ab247eca4226946ff3e75dd2bb47ea))

## [1.2.0](https://www.github.com/bjerkio/gcl-slack/compare/v1.1.1...v1.2.0) (2021-09-15)


### Features

* Add `makePulumiCallback` ([#5](https://www.github.com/bjerkio/gcl-slack/issues/5)) ([b71b2b8](https://www.github.com/bjerkio/gcl-slack/commit/b71b2b83db51ec018d3c3d64523d2434f4f46db1))

### [1.1.1](https://www.github.com/bjerkio/gcl-slack/compare/v1.1.0...v1.1.1) (2021-09-07)


### Bug Fixes

* requests fail (`attributes` is missing) ([0b3689d](https://www.github.com/bjerkio/gcl-slack/commit/0b3689d1446c053823c24998cded28157cc63887))

## [1.1.0](https://www.github.com/bjerkio/gcl-slack/compare/v1.0.0...v1.1.0) (2021-08-30)


### Features

* Add support for all methods with webhook ([bce20a0](https://www.github.com/bjerkio/gcl-slack/commit/bce20a08e0e6bc3f26e853e52e3586bb8df688f7))
* support github.com/bjerkio/nestjs-slack@v1 ([4c0a3b0](https://www.github.com/bjerkio/gcl-slack/commit/4c0a3b058075b478e1859c8dcf5eb416418e841d))

## 1.0.0 (2021-08-29)


### Features

* Add basic support ([c13c88b](https://www.github.com/bjerkio/gcl-slack/commit/c13c88bf12a7643d2c9b4868d80044f9d61e5d9c))
