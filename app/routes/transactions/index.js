import Ember from 'ember';

const {
  Route,
  get
} = Ember;

export default Route.extend({
    model() {
      // On initial load, fetch transactions from the past 30 days.
      const format = 'MM-DD-YYYY';
      const endDate = moment().format(format);
      const startDate = moment().add(-30, 'days').format(format);

      return get(this, 'store').query('transaction', { filterType: 'dateRange', startDate, endDate });
    },

    actions: {
      filter(keyword) {
        if (keyword !== "") {
          return get(this, 'store').filter('transaction', function(transaction) {
            return transaction.get("account").toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
              transaction.get("description").toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
              transaction.get("category").toLowerCase().indexOf(keyword.toLowerCase()) > -1;
          });
        } else {
          return get(this, 'store').filter('transaction', transaction => transaction);
        }
      },

      getAccounts() {
        return get(this, 'store').findAll('account');
      },

      getCategories() {
        return get(this, 'store').findAll('category');
      },

      filterByDateRange(startDate, endDate) {
        const store = get(this, 'store');

        // This prevents cached transactions from showing up when performing search.
        store.unloadAll('transaction');

        // store.query method is overriden to send a GET request at a custom URL.
        return store.query('transaction', { filterType: 'dateRange', startDate, endDate }).then(() => {
          return store.filter('transaction', transaction => transaction);
        });
      },

      addTransaction(transaction) {
        const newTransaction = get(this, 'store').createRecord('transaction', {
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
