import DS from 'ember-data';

export default DS.Model.extend({
  is_income: DS.attr(),
  created_at: DS.attr(),
  guid: DS.attr(),
  is_default: DS.attr(),
  metadata: DS.attr(),
  name: DS.attr(),
  parent_guid: DS.attr(),
  updated_at: DS.attr(),
});
