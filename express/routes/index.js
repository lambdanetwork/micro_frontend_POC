var express = require('express');
var router = express.Router();
const fs = require('fs')

/* GET home page. */
router.get(['/','/Home', '/NestedFragments', '/List', '/NestedFragments/:any'], function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  fs.readFile(__dirname+'/index.html', 'utf-8', (err, data) => {
    res.send(data)
  })
});

const mainAppRoute = 'MainService'
router.get(`/${mainAppRoute}`, (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  openFileAndSend(mainAppRoute, res)
})

const leftMenuRoute = 'LeftMenuService'
router.get(`/script/${leftMenuRoute}`, (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  openFileAndSend(leftMenuRoute, res)
})

const serviceA = 'serviceA'
router.get(`/script/${serviceA}`, (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  openFileAndSend(serviceA, res)
})


const serviceC = 'serviceC'
router.get(`/script/${serviceC}`, (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  openFileAndSend(serviceC, res)
})

const HeaderService = 'HeaderService'
router.get(`/script/${HeaderService}`, (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  openFileAndSend(HeaderService, res)
})

const serviceB = 'serviceB'
router.get(`/script/${serviceB}`, (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  openFileAndSend(serviceB, res)
})


const serviceB1 = 'serviceB1'
router.get(`/script/${serviceB1}`, (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  openFileAndSend(serviceB1, res)
})
const serviceB2 = 'serviceB2'
router.get(`/script/${serviceB2}`, (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  openFileAndSend(serviceB2, res)
})

module.exports = router;

function openFileAndSend(routename, response){
  const path = __dirname+`/../../S3_BUILD_FILES/${routename}/${routename}__v1_0_0.js`
  console.log(path)
  fs.readFile(path, 'utf-8', (err, data) => {
    response.send(data)
  })
}
