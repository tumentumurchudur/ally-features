import Ember from 'ember';
import computed, { alias, gt, mapBy, sort } from 'ember-computed-decorators';

const {
  Component,
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

  @gt('rows.length', 0) hasRows,
  @alias('headers.length') numOfCols,
  @mapBy('rows', 'amount') amounts,
  @sort('rows', 'sortDefinition') sortedRows,

  @computed('sortBy', 'reverseSort')
  sortDefinition(sortBy, reverseSort) {
    const sortOrder = reverseSort ? 'desc' : 'asc';

    return [`${sortBy}:${sortOrder}`];
  },

  @computed('amounts')
  totalAmount(amounts) {
    return amounts.reduce((prev, curr) => prev + curr, 0);
  },

  actions: {
    sort(header) {
      set(this, 'sortBy', header);
      this.toggleProperty('reverseSort');
    },

    excludeTransaction(row) {
      const rows = get(this, 'rows').filter(r => r.id !== row.id);
      set(this, 'rows', rows);

      row.set('isHidden', true);
      row.save();
    }
  }
});
