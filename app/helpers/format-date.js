import Ember from 'ember';

export function formatDate(params/*, hash*/) {
  return moment(new Date(params)).format('MMM DD, YYYY');
}

export default Ember.Helper.helper(formatDate);
