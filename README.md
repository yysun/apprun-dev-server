# esm-server

This is a static web server for developing JavaScript/TypeScript using ES modules. It is based on [live-server](https://www.npmjs.com/package/live-server) and also can serve ES Modules from unpkg.com.

# How to Use

Under you project folder, run
```
npx esm-server
```
![](esm-server.gif)
# Configuration

Create a esm-server.config.js in your project:

```javascript
module.exports = {
  port: 8181, // Set the server port. Defaults to 8080.
  host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: "public", // Set root directory that's being served. Defaults to cwd.
  open: false, // When false, it won't load your browser by default.
  ignore: '', // comma-separated string for paths to ignore
  file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
  wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
  mount: [], // Mount a directory to a route.
  logLevel: 2, //
}
```

PR welcome. Happy coding!

(C) Copyright 2020, Yiyi Sun