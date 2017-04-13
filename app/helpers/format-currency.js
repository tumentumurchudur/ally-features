import Ember from 'ember';

export function formatCurrency(params/*, hash*/) {
  return '$' + parseFloat(params).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

export default Ember.Helper.helper(formatCurrency);
