/* eslint-disable no-console, no-shadow */
const webpackConfig = require('./webpack.prod.config');
const nodegit = require('nodegit');

function open() {
  return nodegit.Repository.open(__dirname);
}

function getVersion() {
  return open()
    .then(repo => repo.getHeadCommit())
    .then(commit => commit.toString());
}

function getStatus() {
  return open().then(repo => repo.getStatus());
}

function commit() {
  const configPath = './config.js';
  return open()
    .then(repo => {
      const signature = nodegit.Signature.default(repo);
      return repo.createCommitOnHead([configPath], signature, signature, 'deploy');
    });
}

function push() {
  return open()
    .then(repo => {
      return repo.getRemote('origin').then(remote => remote.push(
        ['refs/heads/master:refs/heads/master'],
        {
          callbacks: {
            credentials: (url, userName) => {
              return nodegit.Cred.sshKeyFromAgent(userName);
            },
          },
        }));
    });
}

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
      if (err) reject(err);
      resolve();
    });
  });
}

function upload() {
  const client = require('s3').createClient({
    s3Options: {
      region: 'ap-northeast-1',
    },
  });

  return getVersion().then(version => {
    console.log('start upload scripts to s3.');
    const uploader = client.uploadDir({
      localDir: webpackConfig.output.path,
      s3Params: {
        Bucket: 'goommerce',
        Prefix: `app/${version}/`,
        ACL: 'public-read',
      },
    });

    return new Promise((resolve, reject) => {
      uploader.on('error', err => {
        console.log('failed uploading');
        reject(err);
      });
      uploader.on('end', () => {
        console.log('done uploading');
        resolve(version);
      });
    });
  });
}

function run() {
  return webpack()
    .then(() => upload())
    .then(version => replaceBundleVersion(version))
    .then(() => commit())
    .then(() => push())
    .then(null, err => console.log(err));
}

getStatus().then(
  status => {
    if (status.length) {
      console.error('please commit all changes.');
    } else {
      run();
    }
  }
);
