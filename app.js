var sys         = require('sys'),
    http        = require('http'),
    fs          = require('fs'),
    express     = require('express'),
    _           = require('underscore')._,
    markdown    = require('node-markdown').Markdown,
    Commit      = require('./commit');

var app = express.createServer(express.logger());
app.use(express.bodyParser());

var README = markdown(fs.readFileSync('./README.md', 'utf8'), true);

app.get('/', function(request, response) {
  response.send('<html><head><title>Magic Beans</title></head><body>' + README + '</body></html>');
});

app.post('/commits/new/:token', function(request, response) {
  var token = request.params.token;
  console.log(request.body.payload);
  var payload = JSON.parse(request.body.payload);
  _.each(payload.commits, function(item) {
    try {
      var commit = new Commit({
        commit_id: item.id,
        url:       item.url,
        author:    item.author.name,
        message:   item.message,
        token:     request.params.token
      });
      commit.save();
    }
    catch (exception) {
      console.log(sys.inspect(exception));
    }
  });
  response.send(200);
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Listening on ' + port);
});
