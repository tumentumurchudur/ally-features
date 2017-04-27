import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  'guid'() { return faker.random.uuid(); },
  'name'() { return faker.lorem.words(2); }
});
