// requires from node_modules
const express = require('express');

const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const router = new express.Router();

const apiURL = 'http://localhost:3002';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const isDev = app.get('env') === 'development';
 
nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

app.set('view engine', 'njk');

// express assets

app.use('/assets', express.static('assets'))

// API GET

router.get('/api/users', (req, res) => {
    res.status(200).send([
        {
            id: 1,
            username: 'User 1',
        },
        {
            id: 2,
            username: 'User 2'
        }
    ]);
});

// API POST
router.post('/api/users/create', (req, res) => {
    if (req.body.username != '' && req.body.username.length < 5) {
        res.status(500).send({error: 'Not okay, username has failed'});
    } else {
        res.status(200).send({status: 'okay'});
    }
});

// LINKY PAGE

router.get('/', (req, res) => {
    res.render('index');
});

// GET ALL DATA
router.get('/list', (req, res) => {
    res.status(200).send({status: 'okay'});
});

// ADD FORM
router.get('/add', (req, res) => {
    res.render('submit');
});

// PROCESS FORM
router.post('/add', (req, res) => {
    if (req.body.usernam === "" || req.body.username.length < 6) {
        res.render('submit.njk', {error: 'Username is not correct', data: req.body});
    } else {
        axios({
            method: 'post',
            url: `${apiURL}/api/users/create`,
            data: {
                username: req.body.username
                }
            })
        .then(()  => {
            res.render('success');
        })
        .catch((err) => {
            console.log(err);
            res.render('error');
        });
    }
});

app.use(router);

module.exports = app;