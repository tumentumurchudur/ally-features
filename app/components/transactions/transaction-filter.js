import Ember from 'ember';

const {
  Component,
  computed,
  get,
  set,
  $
} = Ember;

export default Component.extend({
  results: [],
  showSearchOption: false,

  init() {
    this._super(...arguments);

    get(this, 'filter')('').then(results => set(this, 'results', results));
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
    }
  }
});
