import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  normalizeResponse(store, type, payload) {
    return {
      data: payload.transactions.map(d => {
        return {
          id: d.id,
          type: type.modelName,
          attributes: {
            account: d.account,
            amount: d.amount,
            category: d.category,
            date: d.date,
            description: d.description,
            logoUrl: d.logoUrl
          }
        };
      })
     };
  }
});