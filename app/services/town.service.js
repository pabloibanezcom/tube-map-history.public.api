const service = {};

service.getPublishedDraft = async (modelsService, townId) => {
  const draft = await modelsService.getModel('Draft')
    .findOne({ town: townId, isPublished: true })
    .select('name description')
  if (!draft) {
    return { statusCode: 404, data: 'No draft published for this town' };
  }
  return { statusCode: 200, data: draft };
}

module.exports = service;