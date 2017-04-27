import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  'guid'() { return faker.random.uuid(); },
  'name'() { return faker.lorem.words(2); },
  'is_income': false,
  'created_at'() { return faker.date.between(new Date('01/01/2017'), new Date('4/15/2017')); },
  'is_default': true,
  'metadata': null,
  'parent_guid': null,
  'updated_at'() { return faker.date.between(new Date('01/01/2017'), new Date('4/15/2017')); }
});