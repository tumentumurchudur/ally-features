import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('transactions/add-transaction', 'Integration | Component | transactions/add transaction', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{transactions/add-transaction}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#transactions/add-transaction}}
      template block text
    {{/transactions/add-transaction}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
