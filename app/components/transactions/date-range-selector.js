import Ember from 'ember';
import computed from 'ember-computed-decorators';

const {
  Component,
  get,
  set
} = Ember;

const CURRENT_MONTH = 'Current month';
const PREV_MONTH = 'Previous month';
const PREV_30_DAYS = 'Previous 30 days';
const LAST_12_MONTHS = 'Last 12 months';

export default Component.extend({
  showOptions: false,
  options: [CURRENT_MONTH, PREV_MONTH, PREV_30_DAYS, LAST_12_MONTHS],
  selectedOption: PREV_30_DAYS,

  @computed('options', 'selectedOption')
  availOptions(options, selectedOption) {
    return options.filter(option => option !== selectedOption);
  },

  actions: {
    showOptions() {
      this.toggleProperty('showOptions');
    },

    select(option) {
      const dateFormat = 'M-D-YYYY';
      let startDate;
      let endDate;

      if (option === CURRENT_MONTH) {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth();

        startDate = new Date(y, m, 1);
        endDate = new Date(y, m + 1, 0);
      } else if (option === PREV_MONTH) {
          const date = new Date(), y = date.getFullYear(), m = date.getMonth() - 1;

          startDate = new Date(y, m, 1);
          endDate = new Date(y, m + 1, 0);
      } else if (option === PREV_30_DAYS) {
          endDate = new Date();
          startDate = moment().add(-30, 'days');
      } else if (option === LAST_12_MONTHS) {
          endDate = new Date();
          startDate = moment().add(-12, 'months');
      }

      this.attrs.onSelect(moment(startDate).format(dateFormat), moment(endDate).format(dateFormat));

      set(this, 'showOptions', false);
      set(this, 'selectedOption', option);
    }
  }
});
