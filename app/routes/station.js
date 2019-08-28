const service = require('../services/station.service');
const log500 = require('../util/log500');

module.exports = (app, modelsService, passport, modelDefinition) => {

  const registerGetStationsByYearRange = () => {
    const url = '/api/:draftId/station/year/:yearTo';
    app.get(url,
      (req, res) => {
        service.getStationsByYearRange(modelsService, req.params.draftId, req.params.yearTo)
          .then(result => res.status(result.statusCode).send(result.data))
          .catch(err => { log500(err); res.status(500).send(err) });
      });
    app.get(`${url}/:yearFrom`,
      (req, res) => {
        service.getStationsByYearRange(modelsService, req.params.draftId, req.params.yearTo, req.params.yearFrom)
          .then(result => res.status(result.statusCode).send(result.data))
          .catch(err => { log500(err); res.status(500).send(err) });
      });
    app.routesInfo['Station'].push({ model: 'Station', name: 'Get stations by year range in draft', method: 'GET', url: url });
    app.routesInfo['Station'].push({ model: 'Station', name: 'Get stations by year range in draft', method: 'GET', url: `${url}/:yearFrom` });
  }


  registerGetStationsByYearRange();

};