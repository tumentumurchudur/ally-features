import DS from 'ember-data';

export default DS.Model.extend({
  guid: DS.attr(),
  name: DS.attr()
});
