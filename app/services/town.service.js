const service = {};

service.getTown = async (modelsService, townUrl) => {
  const town = await modelsService.getModel('Town')
    .findOne({ url: townUrl })
    .select('name url center zoom year alias imgCard country')
    .populate([
      { path: 'country', select: 'name code' }
    ])
  if (!town) {
    return { statusCode: 404, data: 'Town not found' };
  }
  return { statusCode: 200, data: town };
}

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