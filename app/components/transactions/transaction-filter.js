import Ember from 'ember';

const {
  Component,
  get,
  set,
  $
} = Ember;

export default Component.extend({
  results: [],
  showSearchOption: false,
  showManualTransaction: false,

  init() {
    this._super(...arguments);

    get(this, 'filter')('').then(results => set(this, 'results', results));
    get(this, 'getAccounts')().then(accounts => set(this, 'accounts', accounts));
    get(this, 'getCategories')().then(categories => set(this, 'categories', categories));
  },

  actions: {
    filter() {
      const filterValue = get(this, 'value');
      const filterAction = get(this, 'filter');

      filterAction(filterValue).then(results => set(this, 'results', results));
    },

    filterByDateRange(startDate, endDate) {
      const filterAction = get(this, 'filterByDateRange');

      filterAction(startDate, endDate).then(results => set(this, 'results', results));
    },

    showSearchOption() {
      this.toggleProperty('showSearchOption');
      const showSearch = get(this, 'showSearchOption');

      if(showSearch) {
        Ember.run.scheduleOnce('afterRender', this, function() {
          $('#search-input').focus();
        });
      }
    },

    showManualTransaction() {
      set(this, 'showManualTransaction', true);
    },

    closeManualTransaction() {
      set(this, 'showManualTransaction', false);
    },

    addTransaction(transaction) {
      set(this, 'showManualTransaction', false);
      this.attrs.addTransaction(transaction);
    }
  }
});
