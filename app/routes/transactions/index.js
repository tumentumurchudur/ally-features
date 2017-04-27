import Ember from 'ember';

export default Ember.Route.extend({
    controllerName: 'transactions',

    model() {
      // By default, return last 30 days of transactions.
      const format = 'MM-DD-YYYY';
      const endDate = moment().format(format);
      const startDate = moment().add(-30, 'days').format(format);

      return this.store.query('transaction', { filterType: 'dateRange', startDate, endDate });
    }
});
