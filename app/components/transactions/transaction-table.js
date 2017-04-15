import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  classNames: ['transaction-table'],
  rows: [],
  headers: ['date', 'description', 'category', 'account', 'amount'],
  showTotal: false,
  showTotalLabel: "Total",

  countHeaders: computed.alias('headers.length'),
  amounts: computed.mapBy('rows', 'amount'),
  totalAmount: computed('amounts', function() {
    return get(this, 'amounts').reduce((prev, curr) => prev + curr, 0);
  })
});
