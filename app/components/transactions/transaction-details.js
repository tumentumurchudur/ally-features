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
  arrowClass: 'caret-up',
  editRow: false,
  dateFormat: 'MMM DD, YYYY',

  init() {
    this._super(...arguments);

    this.description = get(this, 'row.description');
    this.date = get(this, 'row.date');
    this.memo = get(this, 'row.memo');
  },

  didInsertElement() {
    this._super(...arguments);

    // Sets the component in focus, so it can be closed when esc key is pressed.
    return this.$().attr({ tabindex: 1 }), this.$().focus();
  },

  keyDown(e) {
    // Check for esc key press on keydown.
    if (e.keyCode === 27) {
      this.attrs.close();
    }
  },

  closeOptions() {
    const isOpen = get(this, 'showOptions');

    if (isOpen) {
      set(this, 'showOptions', false);
      set(this, 'arrowClass', 'caret-up');
    }
  },

  actions: {
    close() {
      this.attrs.close();
    },

    selectOption(row, e) {
      e.stopPropagation();

      const actionValue = e.target.getAttribute('data-action-value');

      if (actionValue === 'exclude') {
        this.attrs.exclude(row);
      } else if (actionValue === 'edit') {
        set(this, 'editRow', true);
      } else if (actionValue === 'split') {
        // TODO: Open transaction split view.
      }

      this.closeOptions();
    },

    selectDate(date) {
      set(this, 'date', date);
    },

    changeInput(description) {
      set(this, 'description', description);
    },

    cancelEdit() {
      const description = get(this, 'row.description');
      const date = get(this, 'row.date');
      const memo = get(this, 'row.memo');

      set(this, 'description', description);
      set(this, 'date', date);
      set(this, 'memo', memo);

      set(this, 'editRow', false);
    },

    update(row) {
      const date = get(this, 'date');
      const description = get(this, 'description');
      const memo = get(this, 'memo');

      row.set('date', date);
      row.set('description', description);
      row.set('memo', memo);
      row.save();

      set(this, 'editRow', false);
    },

    toggleOptions(e) {
      e.stopPropagation();

      const isOpen = this.toggleProperty('showOptions');

      set(this, 'arrowClass', isOpen ? 'caret-down' : 'caret-up');
    },

    closeOptions() {
      this.closeOptions();
    }
  }
});
