import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  _normalizeTransactions(transactions, type) {
    return {
      data: transactions.map(d => {
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
  },

  normalizeFindAllResponse(store, type, payload) {
    return this._normalizeTransactions(payload.transactions, type);
  },

  normalizeQueryResponse(store, type, payload) {
    return this._normalizeTransactions(payload.transactions, type);
  },
});