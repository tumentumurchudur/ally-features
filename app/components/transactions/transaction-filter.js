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
    const dates = get(this, 'dates').map(d => new Date(d));

    if (dates.length) {
      const maxDate = moment(Math.max(...dates)).format('MMM DD, YY');
      const minDate = moment(Math.min(...dates)).format('MMM DD, YY');

      return minDate + " - " + maxDate;
    }
  }),

  init() {
    this._super(...arguments);

    get(this, 'filter')('').then(results => set(this, 'results', results));
  },

  actions: {
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
