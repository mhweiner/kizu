# CLI

## Usage: `kizu [options] <glob>`

Example:

```bash
npx kizu -f 'src/**/*.test.ts'
```

## Options

- `--fail-only, -f`: Only show failures in the output. This often results in much less output.
- `--version, -v`: Show version.

## Glob

The glob pattern is used to match files to run tests on. It is passed to the [tiny-glob](https://github.com/terkelg/tiny-glob) library.