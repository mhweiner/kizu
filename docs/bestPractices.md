# Best Practices

- Write your tests with a `.spec.ts` or `.spec.js` extension (although any extension will work as long as it matches the [glob](https://github.com/terkelg/tiny-glob) provided). 

- Put your source code in a `src` folder and keep your unit test files alongside the source, and not in a separate folder.

- Integration tests should be in a separate folder, such as `integration` or `e2e`. `kizu` works great for integration tests too!