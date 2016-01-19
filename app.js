var express = require('express');
var app = express();
var swig = require('swig');

swig.setDefaults({cache: false});

app.use(function(req, res, next) {
  console.log(req.method);
  console.log(req.route);
  next();
})

app.use("/special/", function(req, res, next) {
  console.log("You've reached the special area.");
  next();
})

app.get("/", function(req, res) {
  console.log("200");
  var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
  res.render('index', {title: 'Hall of Fame', people: people});
})

app.engine("html", swig.renderFile);

app.set("view engine", "html");

app.set("views", __dirname + "/views")

app.listen(3000);

var locals = {
    title: 'An Example',
    people: [{
        name: 'Gandalf',
    }, {
        name: 'Frodo'
    }, {
        name: 'Hermione'
    }]
};

swig.renderFile(__dirname + '/views/index.html', locals, function (err, output) {
    console.log(output);
});


