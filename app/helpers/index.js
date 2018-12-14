const router = require('express').Router();

const _registerRoutes = (routes, method) => {
  for (let key in routes) {
    if (
      typeof routes[key] === 'object' &&
      routes[key] !== null &&
      !(routes[key] instanceof Array)
    ) {
      registerRoutes(routes[key], key);
    } else {
      if (method === 'get') {
        router.get(key, routes[key]);
      } else if (method === 'post') {
        router.post(key, routes[key]);
      }
    }
  }
};

let route = routes => {
  _registerRoutes();
  return router;
};

module.exports = { route };
