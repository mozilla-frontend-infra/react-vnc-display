# react-vnc-display

React component to connect and display a remote VNC connection

![preview](https://cldup.com/Hwphp8yUtt-3000x3000.png)

## Features from noVNC

* Supports all modern browsers including mobile (iOS, Android)
* Supported VNC encodings: raw, copyrect, rre, hextile, tight, tightPNG
* WebSocket SSL/TLS encryption (i.e. "wss://") support
* 24-bit true color and 8 bit colour mapped
* Supports desktop resize notification/pseudo-encoding
* Local or remote cursor
* Clipboard copy/paste
* Clipping or scolling modes for large remote screens
* Easy site integration and theming (3 example themes included)
* Licensed under the MPL 2.0

## Getting started

You can install `react-vnc-display` via Yarn or npm:

```bash
# If using Yarn:
yarn add react-vnc-display

# If using npm:
npm install --save react-vnc-display
```

The component from react-vnc-display is `VncDisplay`. This module can be required via ES imports, CommonJS require, or UMD.

```js
import { VncDisplay } from 'react-vnc-display';

// using require
const { VncDisplay } = require('react-vnc-display');
```

### Usage

After importing the component, it can be rendered with the required `url` prop:

```jsx
import React from 'react';
import { render } from 'react-dom';
import { VncDisplay } from 'react-vnc-display';

render((
  <VncDisplay url="wss://some-remote-display:5991/path" />
), document.getElementById('root'));
```

By default the `VncDisplay` will start out with dimensions of 1280x720, but will be resized to the dimensions of the
display once the connection has been established. You can pass noVNC callbacks as props to `VncDisplay` to customize
this and additional behavior.

### Props

`VncDisplay` accepts a single required property of URL:

| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| `url` | String | ✓ | The URL for which to create a remote VNC connection. Should include the protocol, host, port, and path. |

In addition, most of the properties available to [noVNC](https://github.com/novnc/noVNC)
can be provided and will be passed through to the noVNC instance. _Here are a few useful props:_

| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| `onClipboard` | `func` |  | Execute a function when the VNC connection's clipboard updates. |
| `onUpdateState` | `func` |  | Execute a function when the state of the VNC connection changes. |
| `shared` | `bool` |  | Specify whether a VNC connection should disconnect other connections before connecting. |
| `wsProtocols` | `arrayOf(string)` |  | Specify a list of WebSocket protocols this connection should support. |

## Development and Contributing

This repository uses [Neutrino](https://neutrino.js.org) and [neutrino-preset-react-components](https://github.com/eliperelman/neutrino-preset-react-components/)
for developing, previewing, and building React components. To get started:

- Fork and clone this repo.
- Install the dependencies with `yarn`.
- Start the development servers with `yarn start`. Open a browser to http://localhost:5000 to preview the React components.
- Use CTRL-C to exit the dev server.
- Use `yarn build` to generate the compiled component for publishing to npm.

Feel free to open an issue, submit a pull request, or contribute however you would like. Understand that this
documentation is still a work in progress, so file an issue or submit a PR to ask questions or make improvements.
Thanks!
