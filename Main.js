const fs = require("fs");
const axios = require("axios");
let sha1 = require("js-sha1");
var FormData = require("form-data");

const token = "?token=2706026471a1e62a3882211060985bafe80b72f0";

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
    // Check if char is in between a and z,
    if (charCode > 96 && charCode < 123) {
      // To decipher, substract the number
      charCode -= numero_casas;
      // If the new char is 'less' than 'a', 26 should be added to correct it
      if (charCode < 97) {
        charCode += 26;
      }
      decifrado += String.fromCharCode(charCode);
      continue;
    }
    // In case its not a to z, just copy the char
    decifrado += cifrado[i];
  }
  return decifrado;
};

const handleJSON = async () => {
  return await axios
    .get(`https://api.codenation.dev/v1/challenge/dev-ps/generate-data${token}`)
    .then(({ data }) => {
      // IF the number is greater than 26, mod should be used to correct it
      // 27 % 26 == 1, 28 % 26 == 2, etc... 
      if (data.numero_casas > 26) {
        data.numero_casas = data.numero_casas % 26;
      }
      storeJSON(data, "./answer.json");
    })
    .then(() => {
      let answer = loadJSON("./answer.json");
      let decifrado = decipher(answer);
      answer.decifrado = decifrado;
      answer.resumo_criptografico = sha1(decifrado);
      storeJSON(answer, "./answer.json");
      return true;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
};

(async () => {
  let answerOK = await handleJSON();
  if (answerOK) {
    let data = new FormData();
    data.append("answer", fs.createReadStream("./answer.json"));

    axios
      .post(
        `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution${token}`,
        data,
        {
          headers: data.getHeaders()
        }
      )
      .then(response => console.log(response.data))
      .catch(errors => console.log(errors));
  }
})();
