import DS from 'ember-data';

export default DS.Model.extend({
    date: DS.attr(),
    description: DS.attr(),
    category: DS.attr(),
    account: DS.attr(),
    amount: DS.attr("number"),
    logoUrl: DS.attr(),
    isHidden: DS.attr(),
    memo: DS.attr()
});
