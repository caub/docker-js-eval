# js-eval
```sh
$ docker run --rm -i js-eval <<<'1 + 1'
2
```

```js
const eval = require('docker-js-eval');

eval('1 + 1', { memory: '8m' }).then(console.log) // 2
```

## js-eval options:

- `environment`: `node-cjs|node-esm|module|script`
  - `node-cjs`: Like evaluating a normal Node.js CommonJS module (default)
  - `node-esm`: Coming soon
  - `module`: Evaluates as an ES Module
  - `script`: Evaluates as an ES Script
- `timeout`: timeout in ms for this code evaluation
- `cpus`: docker-run cpus option
- `memory`: docker-run memory option
- `net`: docker-run network option, default: 'none'
- `stable`: disable harmony and experimental node flags, default: false



```js run.js
const run = require('docker-js-eval/run');

run('1+1', 'node-cjs' /* environment */, 1000 /* timeout (optional) */ ).then(console.log) // 2
```
