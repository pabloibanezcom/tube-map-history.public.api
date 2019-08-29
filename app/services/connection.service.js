const verifyRoles = require('../auth/role-verification');
const service = {};

service.getDraftConnectionsByYearRangeAuth = async (modelsService, user, draftId, yearTo, yearFrom) => {
  if (!verifyRoles(['M', 'A'], user, draftId)) {
    return { statusCode: 401, data: 'Unauthorized' };
  }
  const connections = await getConnectionsByYearRange(modelsService, draftId, yearTo, yearFrom);
  return { statusCode: 200, data: connections };
}

service.getDraftConnectionsByYearRangePublic = async (modelsService, draftId, yearTo, yearFrom) => {
  const draft = await modelsService.getModel('Draft').findOne({ _id: draftId });

  if (!draft || !draft.isPublished) {
    return { statusCode: 401, data: 'Unauthorized' };
  }

  const connections = await getConnectionsByYearRange(modelsService, draftId, yearTo, yearFrom);
  return { statusCode: 200, data: connections };
}

const getConnectionsByYearRange = async (modelsService, draftId, yearTo, yearFrom) => {
  const yearFromQuery = yearFrom ? { $gt: parseInt(yearFrom) - 1 } : null;
  return await modelsService.getModel('Connection')
    .find({ draft: draftId, year: { ...yearFromQuery, $lt: parseInt(yearTo) + 1 } })
    .select('name year line stations')
    .populate([
      { path: 'line', select: 'colour fontColour' },
      { path: 'stations', select: 'geometry' }
    ]);
}

module.exports = service;