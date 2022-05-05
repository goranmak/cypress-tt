/* eslint-disable @typescript-eslint/no-var-requires */
const defaults = require('../fixtures/defaults');
const fetch = require('node-fetch');

/**
 * Method will hit POST to create fixtures test route and create all the things we need in DB before the test starts
 *
 * @param data
 * @returns {Promise.<*>}
 */
const createFixtures = async (data) => {
  const prepared_data = data.map((object) => {
    object.data = defaults.merge(object.model, object.data);
    return object;
  });

  try {
    const res = await fetch(
      Cypress.env('TEST_API')+`https://kilburg-api.turbotenant.com/test/create_fixtures`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: prepared_data,
        }),
      },
    );

    const data = await res.json();
    if (res && res.status === 200) {
      return data;
    }

    console.log(`Error trying to create fixtures: ${data.message}`);
    return false;
  } catch (e) {
    console.log('Error caught trying to create fixtures.');
    console.log(e);
    return false;
  }
};

module.exports = {
  createFixtures,
};
