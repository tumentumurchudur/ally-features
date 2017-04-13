import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  rows: [],
  headers: ['date', 'description', 'category', 'account', 'amount']
});
