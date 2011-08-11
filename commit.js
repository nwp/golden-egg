var Backbone = require('backbone'),
    _        = require('underscore')._,
    http     = require('http');

var debug_log = function() { };
//var debug_log = console.log;

// borrowed from Prototype.js
function escapeHTML(html) {
  return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

var Commit = module.exports = Backbone.Model.extend({

  // attributes:
  // commit_id
  // url
  // author
  // message
  // token
  
  toXml: function() {
    return '<source_commit>' +
           '<commit_id>' + escapeHTML(this.get('commit_id')) + '</commit_id>' +
           '<url>'       + escapeHTML(this.get('url'))       + '</url>'       +
           '<author>'    + escapeHTML(this.get('author'))    + '</author>'    +
           '<message>'   + escapeHTML(this.get('message'))   + '</message>'   +
           '</source_commit>';
  },

  save: function() {
    var commitXml = this.toXml();
    
    debug_log('Posting the following to Pivotal Tracker: ' + commitXml);
    
    var req = http.request({
      host: 'www.pivotaltracker.com',
      port: 80,
      method: 'POST',
      path: '/services/v3/source_commits',
      headers: {
        'X-TrackerToken': this.get('token'),
        'Content-Type':   'application/xml',
        'Content-Length' : commitXml.length
      }
    }, function(res) {
      debug_log('PT Response status: ' + res.statusCode);
      debug_log('PT Response headers: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        debug_log('PT Response body: ' + chunk);
      });
    });
    
    req.on('error', function(e) {
      throw(e.message)
    });
    
    req.write(commitXml);
    req.end();
  }

});
