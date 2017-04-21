import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  tagName: '',
  showDetails: false,

  actions: {
    showDetails() {
      this.toggleProperty('showDetails');
    },

    excludeTransaction(row) {
      this.attrs.exclude(row);
    }
  }
});
