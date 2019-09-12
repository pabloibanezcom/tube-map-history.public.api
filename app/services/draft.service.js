const verifyRoles = require('../auth/role-verification');
const service = {};

service.getDraftWithTown = async (modelsService, user, draftId) => {
  if (!verifyRoles(['M', 'A'], user, draftId)) {
    return { statusCode: 401, data: 'Unauthorized' };
  }
  const draft = await modelsService.getModel('Draft')
    .findOne({ _id: draftId })
    .select('name town')
    .populate([
      { path: 'town', select: 'name url center zoom year alias imgCard country', populate: { path: 'country', select: 'name code' } }
    ])
  if (!draft) {
    return { statusCode: 404, data: 'Draft not found' };
  }
  return { statusCode: 200, data: draft };
}

module.exports = service;