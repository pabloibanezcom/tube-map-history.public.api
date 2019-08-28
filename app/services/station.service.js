const service = {};

service.getStationsByYearRange = async (modelsService, draftId, yearTo, yearFrom) => {
  const yearFromQuery = yearFrom ? { $gt: parseInt(yearFrom) - 1 } : null;
  const stations = await modelsService.getModel('Station')
    .find({ draft: draftId, year: { ...yearFromQuery, $lt: parseInt(yearTo) + 1 } })
    .select('name year geometry');
  return { statusCode: 200, data: stations };
}

module.exports = service;