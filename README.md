# Chad Playground

Write and run [Chad](https://github.com/chad-pl/Chadnet) in the browser. The real interpreter is compiled to WebAssembly, so programs behave exactly like the CLI.

## Requirements

- [Node.js](https://nodejs.org)
- [Docker](https://docs.docker.com/get-docker/)

Docker is only used to compile the interpreter. No C++ or Emscripten install is needed.

## Setup

```sh
git clone --recurse-submodules https://github.com/chad-pl/playground.git
cd playground
npm install
npm run build:wasm
npm run dev
```

Already cloned without submodules? Run `git submodule update --init` before `npm run build:wasm`.