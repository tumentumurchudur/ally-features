import Ember from 'ember';

const {
  Component,
  computed,
  set,
  get
} = Ember;

export default Component.extend({
  classNames: ['transaction-details'],
  row: {},
  showOptions: false,
  arrowClass: 'arrow-up',
  editRow: false,

  formatDate: computed('row.date', function() {
    const date = get(this, 'row.date');

    return moment(date).format('MMM DD, YYYY');
  }),

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

    cancelEdit() {
      set(this, 'editRow', false);
    },

    updateDetails(row) {
      const formatDate = get(this, 'formatDate');
      const origDate = moment(get(this, 'row.date')).format('MMM DD, YYYY');

      if (formatDate !== origDate) {
        row.set('date', moment(formatDate, 'MMM DD, YYYY'));
      }

      row.save();
      set(this, 'editRow', false);
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
