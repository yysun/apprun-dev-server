#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const liveServer = require("live-server");
const esm = require('./esm-fix-middleware');
const config = './esm-server.config.js'
const root = path.resolve('./');
let params = { root, middleware: [esm(root)] };
if (fs.existsSync(config)) {
  const options = require(config);
  params = {
    ...options,
    middleware: [...options.middleware || [], esm(options.root)]
  };
}
liveServer.start(params);