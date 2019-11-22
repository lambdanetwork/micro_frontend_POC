

# Micro Frontend Proof Of Concept

Microfrontend is ongoing concept, several methods are developed to achieve this. My approach is to deploy each page or services as code in a cdn. Much like jquery where browser load the jquery and execute the code on runtime

## Getting Started
There are 3 folders here. 
1. S3_BUILD_FILES will play role as S3, I decide not to include real S3 to keep everything simple.
2. Express, this will be the main server to load the template, and any other services
3. Services, in this folder there are developmennt code for each services for each page.

### Installing

1. clone the repo
2. `cd micro-frontend`
3. `npm install`
4. `node installModules.js` to install all dependencies on each services
5. `node buildAndDeploy.js` to build and deploy all React pages to "S3" (which is actually just another folder on this repo)`

## Deployment

1. `cd express && npm install` to install all dependencies on express.js
2. `node ./bin/www` to run the server
3. open your browser to `localhost://3002`

## Authors

* **Vidy Alfredo** - *Initial work* - [lambdaAgent](https://github.com/lambdaAgent)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
