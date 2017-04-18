import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  normalizeFindRecordResponse(store, type, payload) {
    const { transaction } = payload;

    return {
      data: {
        id: transaction.id,
          type: type.modelName,
          attributes: {
            account: transaction.account,
            amount: transaction.amount,
            category: transaction.category,
            date: transaction.date,
            description: transaction.description,
            logoUrl: transaction.logoUrl
          }
      }
    };
  },

  normalizeFindAllResponse(store, type, payload) {
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