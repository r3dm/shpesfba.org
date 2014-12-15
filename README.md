copyright R3DM, LLC 2014
Harry Moreno
Berkeley Martinez
Lenore Messler

# SHPE SFBAY AREA website

## Develop
run `npm install`
install gulp if necessary `npm install -g gulp`
run `gulp`

## Run
run `npm install --production`
run `npm start`

## Usage
to add a new model/page to the site
* add it to the navlinks in routes/middleware.js
* add a route to it in routes/index.js
* add a view handler in routes/views e.g. routes/views.jobs.js
* add a model file for it under models/
* update navbar appropriately
