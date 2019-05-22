module.exports = function (app) {
  var router = app.loopback.Router();
  router.get('/email-verification', function (req, res) {
    res.send('emial verification method');
  });
  app.use(router);
}
