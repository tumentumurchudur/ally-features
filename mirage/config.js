export default function() {
  this.namespace = '/api';

  this.get("/transactions", function(db) {
    return db.transactions.where(transaction => !transaction.isHidden);
  });

  this.get('/accounts');
  this.get('/categories');

  this.get('/transactions/from/:startDate/to/:endDate', function(db, query) {
    const { startDate, endDate } = query.params;
    const format = 'MM-DD-YYYY';

    return db.transactions.where(function(transaction) {
      return moment(transaction.date) >= moment(startDate, format) &&
         moment(transaction.date) <= moment(endDate, format) &&
         !transaction.isHidden;
    });
  });

  this.patch('transactions/:id', function(db, query) {
    const id = query.params.id;
    let { transaction } = Object.assign({}, JSON.parse(query.requestBody));
    delete transaction.id;

    return db.transactions.find([id]).update(transaction);
  });

  this.post('transactions', function(db, query) {
    const { transaction } = Object.assign({}, JSON.parse(query.requestBody));

    transaction.id = db.transactions.all().length + 1;

    return db.transactions.create(transaction);
  });

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */
}
