const Discord = require('discord.js');
const request = require('request');
const fs = require('fs');
const config = require('./config.json');
const posts = require('./posts.json');
const client = new Discord.Client();

const webhook = new Discord.WebhookClient(config.webhookid, config.webhooktoken);
client.login(config.bottoken)

const postDict = JSON.parse(fs.readFileSync(posts, 'utf8'));

function postLog(id, url) {
  if (!postDict[id]) posts[id] = {
    url
  }
  else{return;}
  fs.writeFile(posts,JSON.stringify(postDict), (err) => {
    if (err) console.error(err)
  })
}


function fetchRedditPost() {
request(config.url, function(error,response,body) {
      var ok = JSON.parse(body)
      var lol = ok.data.children[0].data
      ok.data.children.forEach(function(ok){
        let NUT = "imgur.com"
        let ext = ".jpg"
        let otherExt = ".gif"
        let dril = ".gifv"
        let r34 = ".png"
    if (ok.data.url.includes(NUT) && !ok.data.url.includes(ext) && !ok.data.url.includes(otherExt || dril || r34)) {
       const SHACK = ok.data.url + ext
      if (postDict[ok.data.id]) {return;}
      else {
         webhook.sendMessage(`${ok.data.title}\n${SHACK}`);
       postLog(ok.data.id, SHACK)
      }
    }
    else if (ok.data.url.includes("i.reddituploads.com")){
     if (postDict[ok.data.id]) {return;}
     else {
        webhook.sendMessage(`${ok.data.title}\n${ok.data.preview.images[0].source.url}`)
      postLog(ok.data.id, ok.data.preview,images[0].source.url)
     }
    }
    else{
      if (postDict[ok.data.id]) {return;}
      else{
        postLog(ok.data.id, ok.data.url)
        webhook.sendMessage(`${ok.data.title}\n${ok.data.url}`);
      }
      
    };
      })
})
};
function redditInterval() {
 setInterval(() => (fetchRedditPost()), 360000);
}
redditInterval();




