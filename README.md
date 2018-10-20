# js-eval
```sh
$ echo "1 + 1" | docker run --rm -i -e JSEVAL_ENV=node-cjs devsnek/js-eval
2
```

```js
const jseval = require('docker-js-eval');

jseval('1 + 1', 'script', { memory: '8m' }).then(console.log); // 2
```

## [js-eval](index.js) options:

- `environment`: `node-cjs|node-esm|module|script`
  - `node-cjs`: Like evaluating a normal Node.js CommonJS module (default)
  - `node-esm`: Coming soon
  - `module`: Evaluates as an ES Module
  - `script`: Evaluates as an ES Script
- `timeout`: timeout in ms for this code evaluation to complete
- `cpus`: docker-run cpus option
- `memory`: docker-run memory option
- `net`: docker-run network option, default: 'none'
- `stable`: disable harmony and experimental node flags, default: false


### [run.js](run.js) usage:

```js
const run = require('docker-js-eval/run');

run('1 + 1', 'script', 100).then(console.log); // 2
```
