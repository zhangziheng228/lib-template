const Formats = ['umd', 'cjs', 'esm'];

const pkgJson = require('./package.json');
const path = require('path');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const ts = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');

const external = [...Object.keys(pkgJson.dependencies || {})];

function makeRollupOptions(format) {
  const isESM = () => format === 'esm';
  const plugins = [
    nodeResolve(),
    ts({
      useTsconfigDeclarationDir: isESM(),
      tsconfig: path.resolve(__dirname, './tsconfig.json'),
      tsconfigOverride: {
        compilerOptions: {
          declaration: isESM(),
          declarationMap: isESM(),
          declarationDir: path.resolve(__dirname, 'dist/temp'),
        },
        exclude: [
          '**/node_modules',
          '**/tests',
          '**/*.config.ts',
          '**/dist',
          'playground',
        ],
      },
    }),
  ];
  if (!isESM()) {
    plugins.push(terser());
  }
  const entryFileNames = pkgJson.name + '.' + format + '.js';
  return {
    input: 'src/index.ts',
    external,
    plugins,
    output: {
      dir: path.resolve(__dirname, 'dist'),
      format,
      name: pkgJson.name,
      globals: external.reduce((prev, next) => {
        prev[next] = next;
        return prev;
      }, {}),
      entryFileNames,
      extend: true,
      exports: 'auto',
    },
  };
}

module.exports = Formats.map((f) => makeRollupOptions(f));
