const verifyRoles = require('../auth/role-verification');
const service = {};

service.getDraftStationsByYearRangeAuth = async (modelsService, user, draftId, yearTo, yearFrom) => {
  if (!verifyRoles(['M', 'A'], user, draftId)) {
    return { statusCode: 401, data: 'Unauthorized' };
  }
  const stations = await getStationsByYearRange(modelsService, draftId, yearTo, yearFrom);
  return { statusCode: 200, data: stations };
}

service.getDraftStationsByYearRangePublic = async (modelsService, draftId, yearTo, yearFrom) => {
  const draft = await modelsService.getModel('Draft').findOne({ _id: draftId });

  if (!draft || !draft.isPublished) {
    return { statusCode: 401, data: 'Unauthorized' };
  }

  const stations = await getStationsByYearRange(modelsService, draftId, yearTo, yearFrom);
  return { statusCode: 200, data: stations };
}

const getStationsByYearRange = async (modelsService, draftId, yearTo, yearFrom) => {
  const yearFromQuery = yearFrom ? { $gt: parseInt(yearFrom) - 1 } : null;
  return await modelsService.getModel('Station')
    .find({ draft: draftId, year: { ...yearFromQuery, $lt: parseInt(yearTo) + 1 } })
    .select('name year geometry');
}

module.exports = service;