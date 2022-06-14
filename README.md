# Vanilla JS Sticky v0.0.9

Vanilla JS sticky block without using extra packages. [DEMO](https://vanilla-sticky.frontend.uvarov.tech/)

## Initialize

Get vanilla-sticky in one of the following ways:

### NPM

```sh
npm install @uvarov.frontend/vanilla-sticky
```

Then import it in your javascript file

```js
import VanillaSticky from '@uvarov.frontend/vanilla-sticky';
```

### or Script tag

It’s possible to manually include the necessary `<script>` tags in the end body of your HTML page and then initialize a calendar via browser globals.

```html
<script src="./js/vanilla-sticky.min.js"></script>
```

## API

The `HTMLElement` option is mandatory, all other options are optional.

| Name | Default | Description |
| ---- | :-----: | ----------- |
| HTMLElement | — | DOM object |
| position | auto | Specifies which edge the block will stick to. Available options: 'auto', 'top', 'bottom'. |
| stretch | true | Stretch the content to the full height of the screen minus the indents if the content is less than the height of the screen. |
| resize | true | Recalculate the height of the content and its location each time the screen height changes. |
| indents.top | 0 | Specify the top indents after which the block will stick. |
| indents.bottom | 0 | Specify the bottom indents after which the block will stick. |
| window.min | null | The minimum screen width after which the module stops working. |
| window.max | null | The maximum screen width after which the module stops working. |

## Usage example

```js
const sidebar = new VanillaSticky({
  HTMLElement: document.querySelector('.sidebar'),
  position: 'bottom',
  stretch: false,
  resize: true,
  indents: {
   top: 70,
   bottom: 10,
  },
  window: {
   min: 1200,
   max: null,
  },
 });

 sidebar.init();
```

Change settings and update:

```js
sidebar.position = 'top';
sidebar.stretch = true;
sidebar.indents.top = 30;
sidebar.indents.bottom = 20;

sidebar.update();
```

## License

MIT License

## Author

Yuri Uvarov (*uvarov.frontend@gmail.com*)
