# js-eval
```sh
$ docker run --rm -i js-eval <<<'1 + 1'
2
```

```js
const eval = require('docker-js-eval');

eval('1 + 1', { memory: '8m' }).then(console.log) // 2
```

## options:

- `environment`: `node-cjs|node-esm|module|script`
  - `node-cjs` (default)
    Like evaluating a normal Node.js CommonJS module
  - `node-esm`
    Coming soon
  - `module`
    Evaluates as an ES Module
  - `script`
    Evaluates as an ES Script
- `timeout`: timeout in ms for this code evaluation
- `cpus`: docker-run cpus option
- `memory`: docker-run memory option
- `net`: docker-run network option, default: 'none'
- `stable`: disable harmony and experimental node flags, default: false

## run.js accepts those environment variables:

- `JSEVAL_ENV`: environment
- `JSEVAL_TIMEOUT`: sets the [vm](https://nodejs.org/api/vm.html) Script timeout
- `JSEVAL_DEPTH`: formatting depth
