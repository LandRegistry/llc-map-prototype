# Local Land Charges Map Prototype
## October 2023

This repo is an stand alone example of an editable [openlayers](https://openlayers.org/) map within the GDS prototype kit


## Running this app

This repo is a copy of GOV.UK Prototype Kit version 13

[Version 13](https://prototype-kit.service.gov.uk/docs/whats-new) is a significant change from previous versions


- node 18 is needed
- run 'npm init' to install node modules
- use 'npm run dev' NOT 'npm start' to run the kit locally
- template / layout locations in the app have changed



## Notes

As well as using open layers javascript library, this prototype uses [environmental variables](https://nodejs.dev/en/learn/how-to-read-environment-variables-from-nodejs/) to configure some of the map. 

A `.env` file will need to be created for these variables:
```
MASTERMAP_API_KEY
WFS_URL
WMTS_URL
```


## About the Prototype Kit

Go to the [GOV.UK Prototype Kit site](https://govuk-prototype-kit.herokuapp.com/docs) to download the latest version and read the documentation.

The Prototype Kit provides a simple way to make interactive prototypes that look like pages on GOV.UK. These prototypes can be used to show ideas to people you work with, and to do user research.

Read the [project principles](https://govuk-prototype-kit.herokuapp.com/docs/principles).

