import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  description: DS.attr('string'),
  category: DS.attr('string'),
  account: DS.attr('string'),
  amount: DS.attr("number"),
  logoUrl: DS.attr('string'),
  isHidden: DS.attr('boolean'),
  memo: DS.attr('string')
});
