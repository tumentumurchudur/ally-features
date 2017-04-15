import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  'date'() { return faker.date.between(new Date('01/01/2017'), new Date('4/15/2017')); },
  'description'() { return faker.lorem.sentence(3); },
  'category'() { return faker.lorem.words(2); },
  'account'() { return faker.lorem.words(2); },
  'amount'() { return parseFloat(faker.finance.amount(100, 2500)); }
});