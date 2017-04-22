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
  hasRows: computed.alias('rows.length'),

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
    },

    excludeTransaction(row) {
      const rows = get(this, 'sortedRows').filter(r => r.id !== row.id);
      set(this, 'rows', rows);

      row.set('isHidden', true);
      row.save();
    }
  }
});
