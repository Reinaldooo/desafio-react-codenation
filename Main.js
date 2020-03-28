const fs = require("fs");
const axios = require("axios");
let sha1 = require("js-sha1");

const storeJSON = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

const loadJSON = path => {
  try {
    return JSON.parse(fs.readFileSync(path, "utf8"));
  } catch (err) {
    console.error(err);
    return false;
  }
};

const decipher = ({ cifrado, numero_casas }) => {
  cifrado.toLowerCase();
  let decifrado = "";
  for (var i = 0; i < cifrado.length; i++) {
    let charCode = cifrado.charCodeAt(i);
    if (charCode > 96 && charCode < 123) {
      charCode -= numero_casas;
      if (charCode < 97) {
        charCode += 26;
      }
      decifrado += String.fromCharCode(charCode);
      continue;
    }
    decifrado += cifrado[i];
  }
  return decifrado;
};

const handleJSON = async () => {
  return await axios
    .get(
      "https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=2706026471a1e62a3882211060985bafe80b72f0"
    )
    .then(({ data }) => {
      if (data.numero_casas > 26) {
        data.numero_casas = data.numero_casas % 26;
      }
      storeJSON(data, "./answer.json");
      console.log("ok");
    })
    .then(() => {
      let answer = loadJSON("./answer.json");
      let decifrado = decipher(answer);
      answer.decifrado = decifrado;
      answer.resumo_criptografico = sha1(decifrado);
      storeJSON(answer, "./answer.json");
      return answer;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
};

handleJSON()