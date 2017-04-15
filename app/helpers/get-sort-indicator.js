import Ember from 'ember';

export function getSortIndicator(params) {
  const [column, sortBy, reverseSort] = params;

  if (column.toLowerCase() === sortBy.toLowerCase() && reverseSort) {
    return 'arrow-up';
  } else {
    return 'arrow-down';
  }
}

export default Ember.Helper.helper(getSortIndicator);
