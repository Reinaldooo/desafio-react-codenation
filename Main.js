const fs = require('fs')
const axios = require('axios');

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

axios.get("https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=2706026471a1e62a3882211060985bafe80b72f0")
  .then(function ({ data }) {
    // handle success
    console.log(data);
    storeData(data, "./answer.json")
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });