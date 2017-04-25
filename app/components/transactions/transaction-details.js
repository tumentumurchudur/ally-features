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

  closeOptions() {
    const isOpen = get(this, 'showOptions');

    if (isOpen) {
      set(this, 'showOptions', false);
      set(this, 'arrowClass', 'arrow-up');
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

      this.closeOptions();
    },

    selectDate(date) {
      let row = get(this, 'row');

      row.set('date', date);
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
      this.closeOptions();
    }
  }
});
