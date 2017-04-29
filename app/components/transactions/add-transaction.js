import Ember from 'ember';
import computed, { reads } from 'ember-computed-decorators';

const {
  Component,
  set,
  get,
  $
} = Ember;

export default Component.extend({
  maxMemoChars: 40,
  amount: null,
  description: null,
  date: new Date(),
  category: null,
  account: null,
  memo: null,

  @reads('maxMemoChars') remainingChars,

  @computed('amount', 'description', 'date', 'category', 'account')
  disableAddButton(amount, description, date, category, account) {
    return !amount || !description || !date || !category || !account;
  },

  actions: {
    changeMemo(memo) {
      set(this, 'memo', memo);
      set(this, 'remainingChars', get(this, 'maxMemoChars') - memo.length);
    },

    selectDate(date) {
      set(this, 'date', date);
    },

    selectCategory(category) {
      set(this, 'category', category);
    },

    selectAccount(account) {
      set(this, 'account', account);
    },

    cancel() {
      this.attrs.cancel();
    },

    add() {
      const transaction = {
        date: get(this, 'date'),
        category: get(this, 'category'),
        account: get(this, 'account'),
        description: get(this, 'description'),
        amount: get(this, 'amount'),
        memo: get(this, 'memo')
      };

      this.attrs.add(transaction);
    }
  }
});
