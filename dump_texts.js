
const request = require('request');
const fs = require('fs');

const textsFilename = './i18n/texts.json';
const localData = require(textsFilename);

const locales = ['en', 'ko', 'zh-cn', 'zh-tw'];
// 2016. 05. 31. [heekyu] localData is superset of server
const dfs = (local, server, key) => {
  if (local.en) {
    locales.forEach((locale) => {
      if (local[locale] !== server[locale]) {
        console.log(`${key} Changed. (${local[locale]}) => (${server[locale]})`);
        local[locale] = server[locale];
      }
    });
  } else {
    Object.keys(local).forEach((c) => {
      if (server[c]) {
        dfs(local[c], server[c], `${key}${key ? '.' : ''}${c}`);
      }
    });
  }
};

request.get('https://www.linkshops.com/api/v1/i18n/texts', (error, response, body) => {
  if (!error && response.statusCode === 200) {
    // console.log(body); // Show the HTML for the Google homepage.
    const serverData = JSON.parse(body);
    dfs(localData, serverData, '');
    fs.writeFile(textsFilename, JSON.stringify(localData, null, 2), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`JSON saved to ${textsFilename}`);
      }
    });
  }
});
