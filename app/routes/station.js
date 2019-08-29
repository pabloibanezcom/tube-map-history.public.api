const service = require('../services/station.service');
const log500 = require('../util/log500');

module.exports = (app, modelsService, passport) => {

  const registerGetDraftStationsByYearRangeAuth = () => {
    const url = '/api/:draftId/private/station/year/:yearTo/:yearFrom';
    app.get(url,
      passport.authenticate('local-user-with-drafts', { session: false }),
      (req, res) => {
        service.getDraftStationsByYearRangeAuth(modelsService, req.user, req.params.draftId, req.params.yearTo, req.params.yearFrom)
          .then(result => res.status(result.statusCode).send(result.data))
          .catch(err => { log500(err); res.status(500).send(err) });
      });
    app.routesInfo['Station'].push({ model: 'Station', name: 'Get stations by year range in draft - Auth', method: 'GET', url: url, auth: ['M', 'A'] });
  }

  const registerGetDraftStationsByYearRangePublic = () => {
    const url = '/api/:draftId/station/year/:yearTo/:yearFrom';
    app.get(url,
      (req, res) => {
        service.getDraftStationsByYearRangePublic(modelsService, req.params.draftId, req.params.yearTo, req.params.yearFrom)
          .then(result => res.status(result.statusCode).send(result.data))
          .catch(err => { log500(err); res.status(500).send(err) });
      });
    app.routesInfo['Station'].push({ model: 'Station', name: 'Get stations by year range in draft - Public', method: 'GET', url: url });
  }

  registerGetDraftStationsByYearRangeAuth();
  registerGetDraftStationsByYearRangePublic();

};