# sos-netlify-example

Created as a part of a prototype for the Summer of Shipping Showcase.

Using Gui Talarico's tutorial [Using Airtable as a Content Backend](https://medium.com/@gtalarico/using-airtable-as-a-content-backend-e373cd0d9974) as well as Kent C. Dodd's [Super simple start to serverless](https://kentcdodds.com/blog/super-simple-start-to-serverless), this is a serverless proxy backend that interacts with Airtable's API to retrieve data. It utilizes Netlify's Functions which simplify setting up AWS Lambda functions, as well as AWS Cloudfront CDN to mitigate Airtable's API rate limits.

If you would like to test it out, send a GET request to any of the following URLs:
- https://sleepy-easley-48bf25.netlify.app/.netlify/functions/projects
- https://sleepy-easley-48bf25.netlify.app/.netlify/functions/persons

## Requirements

You will need to have either `npm` or `yarn` installed, a Netlify account, and the Netlify CLI which can be installed with the following command:

`npm install netlify-cli -g` **OR** `yarn global add netlify-cli`

Additionally, you will need to have an Airbase account and API key for a base. To have this run successfully, you will want to have a base with two tables, each named `projects` and `persons`. Take note of the ID of your base which can be found in your unique Airtable API documentation.

## Running this project locally

1. Fork this repository and clone it to your local machine.
2. In both `project.js` and `persons.js`, change the string in line 8 to the base ID provided by your Airtable documentation. 
3. Gui Talarico's tutorial provides instructions on how to set up an AWS Cloudfront proxy cache toward the end of the article. Follow the instructions, and replace the `endpoint` URL in line 5 of both `project.js` and `persons.js` to the Cloudfront URL in your distribution.
4. Go to your Netlify sites and create a new site from Git, using your newly forked repository. Do not configure the settings with a build command or publish directory. 
5. After the site has been deployed, go to **Site Settings > Build & deploy > Environment** and create a new variable `AIRTABLE_KEY` with your Airtable API key. Re-deploy.
6. In the command line, type in `netlify login` to authenticate and obtain an access token.
7. Afterwards, use `netlify init` to connect your repository.
8. Run the build locally using `netlify build`
9. To test, go to either of the following URLs:
    * http://localhost:8888/.netlify/functions/persons
    * http://localhost:8888/.netlify/functions/projects
