import DS from 'ember-data';
import Ember from 'ember';

const {
  RSVP,
  $
} = Ember;

export default DS.JSONAPIAdapter.extend({
  namespace: 'api',

  query: function(store, type, query) {
    if (query.filterType && query.filterType === 'dateRange') {
      const url = `${this.namespace}/transactions/from/${query.startDate}/to/${query.endDate}`;

      return new RSVP.Promise(function(resolve, reject) {
        $.getJSON(url).then(data => resolve(data), err => reject(err));
      });
    } else {
      return this._super(store, type, query);
    }
  }
});
