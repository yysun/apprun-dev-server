const fs = require('fs');
const path = require('path');
const url = require('url');
const { Readable } = require("stream")
const fix = require('./esm-fix');

module.exports = (root) => {
  return (req, res, next) => {
    const file = url.parse(req.url).pathname;
    var ext = path.extname(file).toLocaleLowerCase();
    if (ext === ".js") {
      try {
        let code;
        let jsfile = path.join(root, file);
        if (!fs.existsSync(jsfile)) {
          jsfile = jsfile.replace('.js', '/index.js');
          if (fs.existsSync(jsfile)) {
            res.statusCode = 302;
            res.setHeader('Location', req.url.replace('.js', '/index.js'));
            res.end();
          }
        } else {
          code = fix(jsfile);
        }
        if (code) {
          console.log('\t ...... ' + path.relative(root, jsfile));
          const stream = Readable.from(code);
          res.setHeader('Content-Length', code.length);
          res.setHeader('Content-Type', 'text/javascript');
          stream.pipe(res);
        } else {
          next();
        }
        return;
      } catch (e) {
        console.log(e.message);
      }
    }
    next();
  }
}