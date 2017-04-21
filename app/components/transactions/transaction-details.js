import Ember from 'ember';

const {
  Component,
  set,
  get
} = Ember;

export default Component.extend({
  classNames: ['transaction-details'],
  row: {},
  showOptions: false,
  arrowClass: 'arrow-up',

  didInsertElement() {
    return this.$().attr({ tabindex: 1 }), this.$().focus();
  },

  keyDown(e) {
    if (e.keyCode === 27) { // esc key press
      this.attrs.close();
    }
  },

  actions: {
    close() {
      this.attrs.close();
    },

    selectOption(row, event) {
      event.stopPropagation();
      const actionValue = event.target.getAttribute('data-action-value');

      if (actionValue === 'exclude') {
        this.attrs.exclude(row);
        set(this, 'showOptions', false);
      }
    },

    toggleOptions(event) {
      event.stopPropagation();

      this.toggleProperty('showOptions');
      const isOpen = get(this, 'showOptions');

      if (isOpen) {
        set(this, 'arrowClass', 'arrow-down');
      } else {
        set(this, 'arrowClass', 'arrow-up');
      }
    },

    closeOptions() {
      const isOpen = get(this, 'showOptions');

      if (isOpen) {
        set(this, 'showOptions', false);
        set(this, 'arrowClass', 'arrow-up');
      }
    }
  }
});
