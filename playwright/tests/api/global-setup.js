// global-setup.js
const { request } = require('@playwright/test');

module.exports = async () => {
  const requestContext = await request.newContext();
  await requestContext.post('http://localhost:3002/login', {
    data: {
        "type": "LOGIN",
        "username": "Katharina_Bernier",
        "password": "s3cret",
        "remember": true
    }
  });
  await requestContext.storageState({ path: 'storageState.json' });
  await requestContext.dispose();
}