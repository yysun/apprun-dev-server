const path = require('path');
const { Readable } = require("stream")
const fix = require('./esm-fix');
const url = require('url');

module.exports = (root) => {
  return (req, res, next) => {
    const file = url.parse(req.url).pathname;
    var ext = path.extname(file).toLocaleLowerCase();
    if (ext === ".js") {
      try {
        fix(root, file);
        const code = fix(root, file);
        if (!code) {
          next();
          return;
        }
        const stream = Readable.from(code);
        res.setHeader('Content-Length', code.length);
        res.setHeader('Content-Type', 'text/javascript');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '-1');
        stream.pipe(res);
        return;
      } catch (e) {
        console.log(e.message);
      }
    }
    next();
  }
}