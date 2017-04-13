import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('transactions/transaction-table', 'Integration | Component | transactions/transaction table', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{transactions/transaction-table}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#transactions/transaction-table}}
      template block text
    {{/transactions/transaction-table}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
