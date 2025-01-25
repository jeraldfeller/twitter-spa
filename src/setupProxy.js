const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.x.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Removes '/api' prefix when forwarding requests
      },
    })
  );
};
