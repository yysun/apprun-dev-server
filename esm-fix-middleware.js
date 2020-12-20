const path = require('path');
const { Readable } = require("stream")
const fix = require('./esm-fix');

module.exports = (root) => {
  return (req, res, next) => {
    var ext = path.extname(req.url).toLocaleLowerCase();
    if (ext === ".js") {
      try {
        const code = fix(root, req.url);
        if (!code) {
          next();
          return;
        }
        const stream = Readable.from(code);
        res.setHeader('Content-Length', code.length);
        res.setHeader('Content-Type', 'text/javascript');
        stream.pipe(res);
        return;
      } catch (e) {
        console.log(e.message);
      }
    }
    next();
  }
}