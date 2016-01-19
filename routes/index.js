module.exports = function(io) {

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true, person: "" } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var tweets = tweetBank.find( {name: name} );
  res.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: tweets, showForm: true, person: name });
});

router.get('/tweets/:id', function(req, res) {
  var id = Number(req.params.id);
  var tweets = tweetBank.find( {ID: id} );
  res.render( 'index', { title: 'Twitter.js - Post ID ' + id, tweets: tweets } );
});

router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  var id = tweetBank.ID;
  io.sockets.emit('new_tweet', { name: name, text: text, ID: id });
  res.redirect('/');
});

return router;

}

