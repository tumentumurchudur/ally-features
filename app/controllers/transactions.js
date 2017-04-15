import Ember from 'ember';

const {
  Controller
} = Ember;

export default Controller.extend({
  actions: {
    filter(value) {
      if (value !== "") {
        return this.store.filter('transaction', function(transaction) {
          return transaction.get("account").toLowerCase().indexOf(value.toLowerCase()) > -1 ||
            transaction.get("description").toLowerCase().indexOf(value.toLowerCase()) > -1 ||
            transaction.get("category").toLowerCase().indexOf(value.toLowerCase()) > -1;
        });
      } else {
        // By default, return last 30 days transactions
        return this.store.filter('transaction', function(transaction) {
          return moment(transaction.get("date")) >= moment().add(-30, "days");
        });
      }
    }
  }
});
