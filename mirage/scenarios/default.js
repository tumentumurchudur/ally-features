export default function(server) {
  server.createList('transaction', 25);
  server.createList('account', 5);
  server.createList('category', 10);

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}
