/* eslint-disable no-console, no-shadow */
const webpackConfig = require('./webpack.prod.config');
// const nodegit = require('nodegit');

const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  region: 'ap-northeast-2',
});

/*
function open() {
  return nodegit.Repository.open(__dirname);
}
*/
function getVersion() {
  return open()
    .then((repo) => repo.getHeadCommit())
    .then((commit) => `${commit.toString().substring(0, 8)}${new Date().getTime()}`);
}

function getStatus() {
  return open().then((repo) => repo.getStatus());
}
/*
function commit() {
  return open()
    .then((repo) => {
      const signature = nodegit.Signature.default(repo);
      return repo.createCommitOnHead(['config.js'], signature, signature, 'deploy');
    });
}

function push() {
  return open()
    .then((repo) => repo.getRemote('origin').then((remote) => remote.push(
      ['refs/heads/master:refs/heads/master'],
      {
        callbacks: {
          credentials: (url, userName) => nodegit.Cred.sshKeyFromAgent(userName),
        },
      }))
    );
}
*/
function replaceBundleVersion(version) {
  process.env.NODE_ENV = 'production';
  const configPath = './config.js';
  const config = require(configPath);
  const fs = require('fs');
  const data = fs.readFileSync(configPath, 'utf8');
  const result = data.replace(new RegExp(config.bundle.version, 'g'), version);
  fs.writeFileSync(configPath, result, 'utf8');
}

function webpack() {
  console.log('start webapck');
  return new Promise((resolve, reject) => {
    require('webpack')(webpackConfig, (err) => {
      console.log('done webapck');
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function upload() {
  /*
  const client = require('s3').createClient({
    s3Options: {
      region: 'ap-northeast-2',
    },
  });
  */
  const uploadFile = (file, version) => {
    const body = fs.readFileSync(`./dist/${file}`);
    const s3Params = {
      Bucket: 'linkshops',
      Key: `app/${version}/${file}`,
      ACL: 'public-read',
      CacheControl: 'max-age=172800',
      ContentType: 'text/javascript',
      // Expires: 'Sat, Apr 19 2025 13:58:30 GMT',
      Body: body,
    };
    console.log(`uploading ${file}`);
    return new Promise((resolve, reject) => {
      s3.putObject(s3Params, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        console.log(`done uploading ${file}`);
        resolve(data);
      });
    });
  };

  return getVersion().then((version) => {
    console.log(`version is '${version}'`);
    console.log('start upload files');
    const files = [
      'app.bundle.js',
      'app.mobile.bundle.js',
    ];
    const promises = files.map((file) => uploadFile(file, version));
    return Promise.all(promises).then((res) => {
      return res;
    });
    /*
    const uploader = client.uploadFile({
      localFile: `${webpackConfig[0].output.path}/app.bundle.js`,
      s3Params: {
        Bucket: 'linkshops',
        // Prefix: `app/${version}/`,
        Key: `tmp/add/app.bundle.${version}.js`,
        ACL: 'public-read',
        CacheControl: 'max-age=172800',
      },
    });

    return new Promise((resolve, reject) => {
      uploader.on('error', (err) => {
        console.log('failed uploading');
        console.log(err.stack);
        reject(err);
      });
      uploader.on('end', () => {
        console.log('done uploading');
        resolve(version);
      });
    });
    */
  });
}
/*
function run() {
  return webpack()
    .then(() => upload())
    .then((version) => replaceBundleVersion(version))
    .then(() => commit())
    .then(() => push())
    .then(null, console.log);
}


getStatus().then((status) => {
  if (status.length) {
    console.error('please commit all changes.');
  } else {
    run();
  }
});
*/

function runUpload() {
  return webpack()
    .then(upload)
    .then(null, console.log);
}
runUpload();

