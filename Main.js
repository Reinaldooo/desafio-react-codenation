const fs = require("fs");
const axios = require("axios");

const storeJSON = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

const loadJSON = (path) => {
  try {    
    return JSON.parse(fs.readFileSync(path, 'utf8'))
  } catch (err) {
    console.error(err)
    return false
  }
}

const decipher = ({ cifrado }) => {
  cifrado.toLowerCase()
  let decifrado = ""
  for (var i = 0; i < cifrado.length; i++) {
    let charCode = cifrado.charCodeAt(i)
    if (charCode > 96 && charCode < 123) {
      charCode -= 10
      if (charCode < 97) {
        charCode += 26
      }
      decifrado += String.fromCharCode(charCode)
      continue
    }
    decifrado += cifrado[i]
  }
  return decifrado
};

// axios
//   .get(
//     "https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=2706026471a1e62a3882211060985bafe80b72f0"
//   )
//   .then(({ data }) => {
//     // handle success
// if( k > 26) {
//   k = k % 26;
// }
//     storeJSON(data, "./answer.json");
//     loadJSON("./answer.json");
//   })
//   .catch((error) => {
//     // handle error
//     console.log(error);
//   })
//   // .finally(function() {
//   //   // always executed
//   // });

let text = loadJSON("./answer.json");

decipher(text)