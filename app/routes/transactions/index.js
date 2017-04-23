import Ember from 'ember';

export default Ember.Route.extend({
    controllerName: "transactions",

    model() {
      return this.store.findAll("transaction");
    }
});
