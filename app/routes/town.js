const service = require('../services/town.service');
const log500 = require('../util/log500');

module.exports = (app, modelsService) => {

  const registerGetPublishedDraftInTown = () => {
    const url = '/api/town/:townId/active-draft';
    app.get(url,
      (req, res) => {
        service.getPublishedDraft(modelsService, req.params.townId)
          .then(result => res.status(result.statusCode).send(result.data))
          .catch(err => { log500(err); res.status(500).send(err) });
      });
    app.routesInfo['Town'].push({ model: 'Town', name: 'Get published draft in town', method: 'GET', url: url });
  }

  app.routesInfo['Town'] = [];
  registerGetPublishedDraftInTown();

};