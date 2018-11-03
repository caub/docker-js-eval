'use strict';

const cp = require('child_process');
const crypto = require('crypto');

const CONTAINER = 'devsnek/js-eval';

module.exports = (code, environment = 'node-cjs', { timeout, cpus, memory, net = 'none', stable } = {}) =>
  new Promise((resolve, reject) => {
    const name = `jseval-${crypto.randomBytes(8).toString('hex')}`;
    const args = ['run', '--rm', '-i', `--name=${name}`, `--net=${net}`, `-eJSEVAL_ENV=${environment}`];

    let timer;
    if (timeout) {
      args.push(`-eJSEVAL_TIMEOUT=${timeout}`);
      timer = setTimeout(() => {
        try {
          cp.execSync(`docker kill --signal=9 ${name}`);
          reject(new Error('(timeout) ' + data)); // send data received so far
        } catch (e) {
          reject(e);
        }
      }, timeout + 10);
    }
    if (cpus) {
      args.push(`--cpus=${cpus}`);
    }
    if (memory) {
      args.push(`-m=${memory}`);
    }

    args.push(CONTAINER);

    if (stable) {
      args.push('node', '--no-warnings', '/run/run.js');
    }

    const proc = cp.spawn('docker', args);
    proc.stdin.write(code);
    proc.stdin.end();

    let data = '';
    proc.stdout.on('data', (chunk) => {
      data += chunk;
    });

    proc.on('error', (e) => {
      clearTimeout(timer);
      reject(e);
    });

    proc.on('exit', (status) => {
      clearTimeout(timer);
      if (status !== 0) {
        reject(new Error(data));
      } else {
        resolve(data);
      }
    });
  });
