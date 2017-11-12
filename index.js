'use strict';
var http = require("http");
const TelegramBot = require('node-telegram-bot-api');
const token = '459081916:AAHrIIxo6jIN1XVMpt-Y6S87RJIXgiCM8e8'
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    var options = {
        "method": "GET",
        "hostname": "api.duckduckgo.com",
        "port": null,
        "path": "http://api.duckduckgo.com/?q=DuckDuckGo&format=json&pretty=1",
        "headers": {
          "cache-control": "no-cache",
          "postman-token": "ac2ab9d1-f60a-8b2b-4074-f21d88583b7c"
        }
      };
      
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
          bot.sendMessage(chatId, body.slice(0, 80));
        });
        
      });
      req.end();
  });