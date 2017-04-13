import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('transactions/transaction-table-row', 'Integration | Component | transactions/transaction table row', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{transactions/transaction-table-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#transactions/transaction-table-row}}
      template block text
    {{/transactions/transaction-table-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
