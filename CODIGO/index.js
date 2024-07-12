var twit = require('twit');
var fs = require('fs');
require('dotenv').config();

const Bot = new twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  bearer_token: process.env.BEARER_TOKEN, 
  timeout_ms: 60 * 1000,
});

function postTweet(tweetText) {
  Bot.post('statuses/update', { status: tweetText })
    .then((response) => {
      console.log('Tweet postado com sucesso!');
    })
    .catch((err) => {
      console.log('Erro ao postar tweet:', err);
    });
}

try {
  var data = fs.readFileSync('MENSAGEM.json', 'utf-8');
  var message = JSON.parse(data);
  var tweet_text = message.tweet_text;
  postTweet(tweet_text);
} catch (err) {
  console.log('Erro ao carregar a mensagem do arquivo MENSAGEM.json:', err);
}
