import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api'
});
