#### Desafio Codenation AceleraDev ReactJS
https://www.codenation.dev/aceleradev/react-online-1/challenge/dev-ps?utm_source=consideration-react-online-1&utm_medium=email-bottom&utm_campaign=desafio-selecao
## Criptografia de Júlio César
Segundo o Wikipedia, criptografia ou criptologia (em grego: kryptós, “escondido”, e gráphein, “escrita”) é o estudo e prática de princípios e técnicas para comunicação segura na presença de terceiros, chamados “adversários”. Mas geralmente, a criptografia refere-se à construção e análise de protocolos que impedem terceiros, ou o público, de lerem mensagens privadas. Muitos aspectos em segurança da informação, como confidencialidade, integridade de dados, autenticação e não-repúdio são centrais à criptografia moderna. Aplicações de criptografia incluem comércio eletrônico, cartões de pagamento baseados em chip, moedas digitais, senhas de computadores e comunicações militares. Das Criptografias mais curiosas na história da humanidade podemos citar a criptografia utilizada pelo grande líder militar romano Júlio César para comunicar com os seus generais. Essa criptografia se baseia na substituição da letra do alfabeto avançado um determinado número de casas. Por exemplo, considerando o número de **casas = 3:**

>**Normal:** a ligeira raposa marrom saltou sobre o cachorro cansado

>**Cifrado:** d oljhlud udsrvd pduurp vdowrx vreuh r fdfkruur fdqvdgr

#### Regras
- As mensagens serão convertidas para minúsculas tanto para a criptografia quanto para descriptografia.
- Neste caso os números e pontos serão mantidos, ou seja:

>Normal: 2a.a
>Cifrado: 2d.d

Este algoritmo escrito em JavaScript utiliza o NodeJS para enviar uma requisição `GET` à API da codenation e recebe o seguinte JSON:

```
{
	"numero_casas": 10,
	"token":"token_do_usuario",
	"cifrado": "texto criptografado",
	"decifrado": "aqui vai o texto decifrado",
	"resumo_criptografico": "aqui vai o resumo"
}
```

Em seguida ele salva o conteúdo do JSON em um arquivo com o nome answer.json, e executa os seguintes passos:

- Lê e decifra o item `cifrado`
- Salva o texto decifrado no item `decifrado`
- Calcula o resumo criptografico utilizando um algoritmo de `sha1`
- Salva o resumo no item `resumo_criptografico`
- Envia uma requisição `POST` para a API enviando o arquivo alterado

Em seguida a API responde com `{ "score": 100}` indicando que o algoritmo funciona perfeitamente.
