import Ember from 'ember';

const {
  Controller,
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
        return this.store.filter('transaction', transaction => transaction);
      }
    },

    getAccounts() {
      return this.store.findAll('account');
    },

    getCategories() {
      return this.store.findAll('category');
    },

    filterByDateRange(startDate, endDate) {
      // This prevents cached transactions from showing up when performing search.
      this.store.unloadAll('transaction');

      return this.store.query('transaction', { filterType: 'dateRange', startDate, endDate });
    },

    addTransaction(transaction) {
      const newTransaction = this.store.createRecord('transaction', {
        date: transaction.date,
        account: transaction.account,
        amount: transaction.amount,
        category: transaction.category,
        description: transaction.description,
        isHidden: false,
        memo: transaction.memo
      });

      newTransaction.save();
    }
  }
});
