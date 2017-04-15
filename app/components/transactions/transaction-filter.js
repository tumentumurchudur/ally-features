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

  dates: computed.mapBy('results', 'date'),
  dateRange: computed('dates', function() {
    const allDates = get(this, 'dates').map(date => new Date(date));

    if (allDates.length) {
      const dateFormat = 'MMM DD, YY';
      const maxDate = moment(Math.max(...allDates)).format(dateFormat);
      const minDate = moment(Math.min(...allDates)).format(dateFormat);

      return minDate + " - " + maxDate;
    }
  }),

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
