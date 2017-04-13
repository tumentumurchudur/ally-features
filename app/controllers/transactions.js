import Ember from 'ember';

const {
  Controller
} = Ember;

export default Controller.extend({
  actions: {
    filter(value) {
      if (value !== "") {
        return this.store.filter('transaction', function(transaction) {
          // TODO: Search for transactions by a keyword on all columns.
          return transaction.get("account").toLowerCase().indexOf(value.toLowerCase()) > -1;
        });
      } else {
        return this.store.findAll("transaction");
      }
    }
  }
});
