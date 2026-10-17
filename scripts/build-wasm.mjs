// Builds chadnet to WebAssembly inside an Emscripten container
// Output: src/engine/wasm/chad.js + chad.wasm (see wasm/CMakeLists.txt)

import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const EMSDK_IMAGE = 'emscripten/emsdk:6.0.12'
const CONTAINER_ROOT = '/src'
const BUILD_COMMAND = 'emcmake cmake -S wasm -B wasm/build && cmake --build wasm/build'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))

// on Linux/macOS: write files as the current user instead of root
const userArgs = process.getuid ? ['--user', `${process.getuid()}:${process.getgid()}`] : []

const result = spawnSync(
  'docker',
  [
    'run',
    '--rm',
    '--mount', `type=bind,source=${repoRoot},target=${CONTAINER_ROOT}`,
    '--workdir', CONTAINER_ROOT,
    ...userArgs,
    EMSDK_IMAGE,
    'sh', '-c', BUILD_COMMAND,
  ],
  { stdio: 'inherit' },
)

if (result.error) {
  console.error(`Could not run docker: ${result.error.message}`)
  process.exit(1)
}

process.exit(result.status ?? 1)