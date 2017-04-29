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
  loading: false,

  init() {
    this._super(...arguments);

    get(this, 'filter')('').then(results => set(this, 'results', results));
    get(this, 'getAccounts')().then(accounts => set(this, 'accounts', accounts));
    get(this, 'getCategories')().then(categories => set(this, 'categories', categories));
  },

  actions: {
    filter(value) {
      const filterAction = get(this, 'filter');

      filterAction(value).then(results => set(this, 'results', results));
    },

    filterByDateRange(startDate, endDate) {
      const filterAction = get(this, 'filterByDateRange');

      set(this, 'loading', true);
      filterAction(startDate, endDate).then(results => {
        set(this, 'results', results);
        set(this, 'loading', false);
      });
    },

    showSearchOption() {
      const isSearchShowing = this.toggleProperty('showSearchOption');

      // Sets focus in the search input.
      if(isSearchShowing) {
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
