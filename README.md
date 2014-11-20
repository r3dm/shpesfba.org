[ ![Codeship Status for bigr3dm/shpeSFBA](https://codeship.io/projects/1f64acd0-1bad-0132-b497-4a19bf040eb5/status)](https://codeship.io/projects/34983)

copyright R3DM, LLC 2014
Harry Moreno
Berkeley Martinez
Lenore Messler

# SHPE SFBAY AREA website

run `npm install`
`bower install`
install gulp if necessary `npm install -g gulp`
run `gulp`

## TODO
* add form to website that lets anyone submit a job posting, webmaster can then approve/edit/publish the
ad onto the job listings page [done]
* fix contact form so that it actually submits an email to webmaster or shows up in a queue for him [pending]
* revamp gallery presentation - load larger pictures [done]
* make hover blur text look more attractive and legible [done]
* gallery needs to indicate that you can load entire gallery on mobile somehow [defer]
* Add job details to site. Either load a new page with more details or expand listing in the browser [done]
* fix firefox placeholder text clipping. the text is being clipped at the top [TODO]
* make `latest news` section in footer load events [done]
* add form validation client & server side

## Usage
to add a new model/page to the site
* add it to the navlinks in routes/middleware.js
* add a route to it in routes/index.js
* add a view handler in routes/views e.g. routes/views.jobs.js
* add a model file for it under models/
* update navbar appropriately 
