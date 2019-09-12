const service = require('../services/draft.service');
const log500 = require('../util/log500');

module.exports = (app, modelsService, passport) => {

  const registerGetDraftWithTown = () => {
    const url = '/api/draft/:draftId';
    app.get(url,
      passport.authenticate('local-user-with-drafts', { session: false }),
      (req, res) => {
        service.getDraftWithTown(modelsService, req.user, req.params.draftId)
          .then(result => res.status(result.statusCode).send(result.data))
          .catch(err => { log500(err); res.status(500).send(err) });
      });
    app.routesInfo['Draft'].push({ model: 'Draft', name: 'Get draft with town', method: 'GET', url: url, auth: ['M', 'A'] });
  }

  app.routesInfo['Draft'] = [];
  registerGetDraftWithTown();

};