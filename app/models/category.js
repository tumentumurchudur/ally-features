import DS from 'ember-data';

export default DS.Model.extend({
  is_income: DS.attr('boolean'),
  created_at: DS.attr('date'),
  guid: DS.attr('string'),
  is_default: DS.attr('boolean'),
  metadata: DS.attr('string'),
  name: DS.attr('string'),
  parent_guid: DS.attr('string'),
  updated_at: DS.attr('date')
});
