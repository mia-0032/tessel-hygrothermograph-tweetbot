tessel-hygrothermograph-tweetbot
================================

Hygrothermograph tweet bot using [Tessel](https://tessel.io/).

## Setup

Connect [ClimateModule](https://tessel.io/modules#module-climate) to your Tessel port A.

```
# setup WiFi.
$ tessel wifi -n YOUR_WIFI_SSID -p YOUR_WIFI_PASSWORD
```

```
# setup this application.
$ git clone git@github.com:mia-0032/tessel-hygrothermograph-tweetbot.git
$ cd tessel-hygrothermograph-tweetbot
$ npm install
```

```
$ mv settings.sample.js settings.js
# configure your twitter token.
$ vi settings.js
```

## Test Run

```
$ tessel run index.js
```

## Stand-alone Run

```
$ tessel push index.js
```
