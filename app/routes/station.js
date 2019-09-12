const service = require('../services/station.service');
const log500 = require('../util/log500');

module.exports = (app, modelsService, passport) => {

  const registerGetDraftStationsByYearRangeAuth = () => {
    const url = '/api/:draftId/private/stations';
    app.get(url,
      passport.authenticate('local-user-with-drafts', { session: false }),
      (req, res) => {
        service.getDraftStationsByYearRangeAuth(modelsService, req.user, req.params.draftId)
          .then(result => res.status(result.statusCode).send(result.data))
          .catch(err => { log500(err); res.status(500).send(err) });
      });
    app.routesInfo['Station'].push({ model: 'Station', name: 'Get stations by year range in draft - Auth', method: 'GET', url: url, auth: ['M', 'A'] });
  }

  const registerGetDraftStationsByYearRangePublic = () => {
    const url = '/api/:draftId/stations';
    app.get(url,
      (req, res) => {
        service.getDraftStationsByYearRangePublic(modelsService, req.params.draftId)
          .then(result => res.status(result.statusCode).send(result.data))
          .catch(err => { log500(err); res.status(500).send(err) });
      });
    app.routesInfo['Station'].push({ model: 'Station', name: 'Get stations by year range in draft - Public', method: 'GET', url: url });
  }

  registerGetDraftStationsByYearRangeAuth();
  registerGetDraftStationsByYearRangePublic();

};