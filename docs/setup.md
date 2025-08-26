# Installation & Setup

Using `kizu` is really easy! Here's a quick guide to get you started.

## 1. Install kizu and c8

```console
npm i -D kizu c8
```

> Note: `c8` is optional, but recommended for code coverage.

## 2. (TypeScript Only) Make sure your [tsconfig.json](../tsconfig.json) file has source maps enabled:

```json
{
    "sourceMap": true
}
```

## 3. (c8 only) If using c8 for coverage, create an `.c8rc.json` file in the root of your project (or use another config option), following the [c8 documentation](https://github.com/bcoe/c8). 

Example:

```json
{
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "**/*.spec.ts",
  ],
  "reporter": [], 
  "all": true,
  "cache": false,
  "clean": true
}
```

The above example will include all `.ts` files in the `src` folder, excluding any `.spec.ts` files. You can see our [.c8rc.json](../.c8rc.json) file for reference.

## 4. Set up your test command in your `package.json` file as appropriate for your project.

Example for Typescript with `c8`:

```json
{
    "test": "c8 kizu 'src/**/*.spec.@(ts|js)' && c8 report -r text -r html"
}
```

The above command, along with our [.c8rc.json](../.c8rc.json) file settings, will do the following:

1. Run `c8` for code coverage.
2. Run any  `.spec.js` or `.spec.ts` file within the `src` folder, recursively.
3. If the test is successful, generate both an HTML and text coverage report.

Simplest example without `c8`:

```json
{
    "test": "kizu 'src/**/*.spec.@(ts|js)'"
}
```

You can customize the `kizu` command to your situation. The string in quotes is a [glob](https://github.com/terkelg/tiny-glob).

Some more examples:

```bash
# Run all tests in the src folder with names ending in .spec.ts or .spec.js (glob) and only show failures in the output.
npx kizu 'src/**/*.spec.ts' --fail-only

# a specific file and show all output
npx kizu 'src/foo.spec.ts'
```