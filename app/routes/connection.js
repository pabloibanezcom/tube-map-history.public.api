const service = require('../services/connection.service');
const log500 = require('../util/log500');

module.exports = (app, modelsService, passport) => {

  const registerGetDraftConnectionsByYearRangeAuth = () => {
    const url = '/api/:draftId/private/connection/year/:yearTo/:yearFrom';
    app.get(url,
      passport.authenticate('local-user-with-drafts', { session: false }),
      (req, res) => {
        service.getDraftConnectionsByYearRangeAuth(modelsService, req.user, req.params.draftId, req.params.yearTo, req.params.yearFrom)
          .then(result => res.status(result.statusCode).send(result.data))
          .catch(err => { log500(err); res.status(500).send(err) });
      });
    app.routesInfo['Connection'].push({ model: 'Connection', name: 'Get connections by year range in draft - Auth', method: 'GET', url: url, auth: ['M', 'A'] });
  }

  const registerGetDraftConnectionsByYearRangePublic = () => {
    const url = '/api/:draftId/connection/year/:yearTo/:yearFrom';
    app.get(url,
      (req, res) => {
        service.getDraftConnectionsByYearRangePublic(modelsService, req.params.draftId, req.params.yearTo, req.params.yearFrom)
          .then(result => res.status(result.statusCode).send(result.data))
          .catch(err => { log500(err); res.status(500).send(err) });
      });
    app.routesInfo['Connection'].push({ model: 'Connection', name: 'Get connections by year range in draft - Public', method: 'GET', url: url });
  }

  app.routesInfo['Connection'] = [];
  registerGetDraftConnectionsByYearRangeAuth();
  registerGetDraftConnectionsByYearRangePublic();

};