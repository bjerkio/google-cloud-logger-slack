<p align="center">
    <img src="./.github/logo.svg" alt="Logo" width="150px">
</p>

<p align="center">
    <h3 align="center">Slack for Google Cloud Logging</h3>
</p>

<p align="center">
    Transport messages (and objects) from Slack to Google Cloud Logging
    <br />
    <br />
    <a href="#space_invader--usage">Quick Start Guide</a>
    ·
    <a href="https://github.com/bjerkio/gcl-slack/issues">Request Feature</a>
    ·
    <a href="https://github.com/bjerkio/gcl-slack/issues">Report Bug</a>
  </p>
</p>

---

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
![Release](https://github.com/bjerkio/gcl-slack/workflows/Release/badge.svg)

[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/bjerkio/gcl-slack.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/bjerkio/gcl-slack/context:javascript)
[![codecov](https://codecov.io/gh/bjerkio/gcl-slack/branch/main/graph/badge.svg)](https://codecov.io/gh/bjerkio/gcl-slack)
[![Maintainability](https://api.codeclimate.com/v1/badges/abaf7c9907eccc452518/maintainability)](https://codeclimate.com/github/bjerkio/gcl-slack/maintainability)

**gcl-slack** is built to consume logs in Google Cloud Logger and forward to
Slack. You can use this library to let your team know a something happened in
your app, if an exception is thrown or use the special [slack object] to send
[slack blocks] to remove requests to Slack from your production load.

[slack object]: #
[slack blocks]: https://api.slack.com/block-kit

### :zap: &nbsp; Features

- Supports Slack webhook and the Slack API ⚙️
- [Slack blocks] 📦

### :space_invader: &nbsp; Usage

```shell
▶ yarn add gcl-slack
```

You can deploy however you want, with Pulumi's [Callback
Function][pulumi-callback] or with [Firebase CLI][firebase].

**We are currently building this library out, and once things are ready for
production loads, we'll add tutorials to make it easier to configure this**

You'll need to configure a [sink] in order to make this work. The basic design
of library, is that you'll create a [search query] which you add to a [sink] to
forward log entries to `gcl-slack`.

[sink]: https://cloud.google.com/logging/docs/export/configure_export_v2
[search query]: https://cloud.google.com/logging/docs/view/advanced-queries

### _Offload Requests_ to Slack API

This package is designed to solve two issues, a) forward information from Cloud
Logger and b) offload requests to Slack API.

Sometimes we want to be notified on Slack when something happends, let's say a
user is created or a customer subscribed to your service. Since we have a
state-of-the-art logging system listening in on the application outputs we can
output a message or even better a JSON object. This object is dumped to Cloud
Logger, which you create a [sink]s to route log entries to this library. This
library can consume what we call [slack object]s, which is basicly the same as
you would send to either the Slack API or webhook.

The result is that your Kubernetes Pod, Cloud Run or Cloud Functions instance
can dump a simple JSON object to the log and your team can see it in a channel.

[pulumi-callback]:
  https://www.pulumi.com/blog/simple-serverless-programming-with-google-cloud-functions-and-pulumi/
[firebase]: https://firebase.google.com/docs/functions/get-started
