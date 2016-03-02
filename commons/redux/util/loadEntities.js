import { get, pick } from 'lodash';

export default function loadEntities(state, key, model) {
  const pagination = get(state.pagination, key, {});
  const ids = pagination.ids || [];
  const entities = ids.map(id => state.entities[model][id]);
  return {
    pagination: pick(pagination, ['nextPageUrl', 'isFetching']),
    [model]: entities.filter(entity => !!entity),
  };
}
