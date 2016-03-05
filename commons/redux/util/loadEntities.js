import { get, pick } from 'lodash/object';

const _ = require('lodash');

export default function loadEntities(state, key, model) {
  const pagination = get(state.pagination, key, {});
  const ids = pagination.ids || [];
  // 2016. 03. 05. [heekyu] when id is deleted
  const entities = ids.map((id) => _.get(state.entities, `${model}.${id}`));
  return {
    pagination: pick(pagination, ['nextPageUrl', 'isFetching']),
    [model]: entities.filter(entity => !!entity),
  };
}
