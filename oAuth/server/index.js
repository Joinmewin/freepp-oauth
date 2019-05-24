const express = require('express');
const logger = require('./logger');
const cookieParser = require('cookie-parser');
const https = require('https');
const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const resolve = require('path').resolve;
const app = express();
const fs = require('fs');

function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }
  return '0.0.0.0';
}

console.log(getIPAddress());

app.use(cookieParser());


// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3033;
// const portHttps = argv.port || process.env.PORT || 8443;
// const httpsServer = https.createServer(credentials, app);

// Start HTTPS Server
// httpsServer.listen(portHttps, (err) => {
//   if (err) {
//     return logger.error(err.message);
//   }
// Connect to ngrok in dev mode
//   if (ngrok) {
//     ngrok.connect(portHttps, (innerErr, url) => {
//       if (innerErr) {
//         return logger.error(innerErr);
//       }
//
//       logger.appStarted(portHttps, url);
//     });
//   } else {
//     logger.appStarted(portHttps);
//   }
// return true;
// });


const server = https.createServer({
        key: fs.readFileSync("./ssl/ssl.key"),
        cert: fs.readFileSync("./ssl/ssl.cert")
},app)


// Start your app.
server.listen(port, err => {
//app.listen(port, err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, url);
      return true;
    });
  } else {
    logger.appStarted(port);
  }
  return true;
});
