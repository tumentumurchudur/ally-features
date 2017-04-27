import Ember from 'ember';

const {
  Component,
  computed,
  set,
  get,
  $
} = Ember;

const MAX_CHARS = 40;

export default Component.extend({
  dateFormat: 'MMM DD, YYYY',
  remainingChars: MAX_CHARS,
  amount: null,
  description: null,
  date: new Date(),
  category: null,
  account: null,
  memo: null,

  enableSave: computed('amount', 'description', 'date', 'category', 'account', function() {
    const amount = get(this, 'amount');
    const description = get(this, 'description');
    const date = get(this, 'date');
    const category = get(this, 'category');
    const account = get(this, 'account');

    return !amount || !description || !date || !category || !account;
  }),

  reset() {
    set(this, 'amount', null);
    set(this, 'description', null);
    set(this, 'date', new Date());
    set(this, 'category', null);
    set(this, 'account', null);
    set(this, 'memo', null);

    $('#ddCategory').val("");
    $('#ddAccount').val("");
  },

  actions: {
    changeTextArea(value) {
      set(this, 'remainingChars', MAX_CHARS - value.length);
      set(this, 'memo', value);
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

    close() {
      this.reset();
      this.attrs.close();
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
      this.reset();
    }
  }
});
