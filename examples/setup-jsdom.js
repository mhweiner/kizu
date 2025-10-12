// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const {JSDOM} = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
    pretendToBeVisual: true,
    resources: 'usable',
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Make sure document.body exists
if (!global.document.body) {

    global.document.body = global.document.createElement('body');
    global.document.documentElement.appendChild(global.document.body);

}
