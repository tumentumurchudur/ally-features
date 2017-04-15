import Ember from 'ember';

const {
  Component,
  computed,
  get,
  set
} = Ember;

export default Component.extend({
  classNames: ['transaction-table'],
  rows: [],
  headers: ['date', 'description', 'category', 'account', 'amount'],
  showTotal: false,
  showTotalLabel: "Total",
  reverseSort: false,
  sortBy: 'date',

  countHeaders: computed.alias('headers.length'),
  amounts: computed.mapBy('rows', 'amount'),
  sortedRows: computed.sort('rows', 'sortDefinition'),
  sortDefinition: computed('sortBy', 'reverseSort', function() {
    const sortOrder = get(this, 'reverseSort') ? 'desc' : 'asc';
    return [`${get(this, 'sortBy')}:${sortOrder}`];
  }),
  totalAmount: computed('amounts', function() {
    return get(this, 'amounts').reduce((prev, curr) => prev + curr, 0);
  }),

  actions: {
    sort(colHeader) {
      set(this, 'sortBy', colHeader);
      this.toggleProperty('reverseSort');
    }
  }
});
