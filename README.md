[ ![Codeship Status for bigr3dm/shpeSFBA](https://codeship.io/projects/616a4cc0-7eaa-0132-51e7-5a708499e289/status?branch=master)](https://codeship.io/projects/57042)

copyright (c) 2014-2015 The R3DM, LLC. http://the.r3dm.com

# SHPE SFBAY AREA website

## Develop

* run `npm install`
* install gulp if necessary `npm install -g gulp`
* run `gulp`

## Run

* run `npm install --production`
* run `npm start`

## Usage
To add a new model/page to the site

* add it to the nav links in routes/middleware.js
* add a route to it in routes/index.js
* add a view handler in routes/views e.g. routes/views.jobs.js
* add a model file for it under models/
* update navbar appropriately
