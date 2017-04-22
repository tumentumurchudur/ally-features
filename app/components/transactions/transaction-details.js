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
  editRow: false,

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
      } else if (actionValue === 'edit') {
        set(this, 'editRow', true);
      }

      set(this, 'showOptions', false);
    },

    cancelEdit() {
      set(this, 'editRow', false);
    },

    updateDetails(row) {
      set(this, 'editRow', false);
      row.save();
    },

    toggleOptions(event) {
      event.stopPropagation();

      this.toggleProperty('showOptions');
      const isOpen = get(this, 'showOptions');

      set(this, 'arrowClass', isOpen ? 'arrow-down' : 'arrow-up');
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
