import { Component } from 'react';
import { arrayOf, string, bool, func, number, object } from 'prop-types';
import { RFB } from 'novnc-node';

/**
 * React component to connect and display a remote VNC connection.
 */
export default class VncDisplay extends Component {
  static propTypes = {
    /**
     * The URL for which to create a remote VNC connection.
     * Should include the protocol, host, port, and path.
     */
    url: string.isRequired,
    /**
     * Customize the CSS styles of the canvas element with an object.
     */
    style: object,
    /**
     * Set the width of the canvas element.
     */
    width: number,
    /**
     * Set the height of the canvas element.
     */
    height: number,
    /**
     * Force a URL to be communicated with as encrypted.
     */
    encrypt: bool,
    /**
     * Specify a list of WebSocket protocols this connection should support.
     */
    wsProtocols: arrayOf(string),
    /**
     * Execute a function when the VNC connection's clipboard updates.
     */
    onClipboard: func,
    /**
     * Execute a function when the state of the VNC connection changes.
     */
    onUpdateState: func,
    /**
     * Execute a function when the password of the VNC is required.
     */
    onPasswordRequired: func,
    /**
     * Execute a function when an alert is raised on the VNC connection.
     */
    onBell: func,
    /**
     * Execute a function when the desktop name is entered for the connection.
     */
    onDesktopName: func,
    /**
     * Specify the connection timeout for the VNC connection.
     */
    connectTimeout: number,
    /**
     * Specify the timeout for disconnection of the VNC connection.
     */
    disconnectTimeout: number,
    /**
     * Specify whether a VNC connection should disconnect other connections
     * before connecting.
     */
    shared: bool,
  };

  static defaultProps = {
    style: null,
    encrypt: null,
    wsProtocols: ['binary'],
    trueColor: true,
    localCursor: true,
    connectTimeout: 5,
    disconnectTimeout: 5,
    width: 1280,
    height: 720,
    onClipboard: null,
    onUpdateState: null,
    onPasswordRequired: null,
    onBell: null,
    onDesktopName: null,
    shared: false,
  };

  componentDidMount() {
    this.connect();
  }

  componentWillUnmount() {
    this.disconnect();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.rfb) {
      return;
    }

    if (nextProps.scale !== this.props.scale) {
      this.rfb.get_display().set_scale(nextProps.scale || 1);
      this.get_mouse().set_scale(nextProps.scale || 1);
    }
  }

  disconnect = () => {
    if (!this.rfb) {
      return;
    }

    this.rfb.disconnect();
    this.rfb = null;
  };

  connect = () => {
    this.disconnect();

    if (!this.canvas) {
      return;
    }

    const {
      name,
      connectTimeout,
      url,
      width,
      height,
      encrypt,
      ...opts
    } = this.props;

    this.rfb = new RFB({
      ...opts,
      encrypt: encrypt !== null ? encrypt : url.startsWith('wss:'),
      target: this.canvas,
    });
    this.rfb.connect(url);
  };

  registerChild = ref => {
    this.canvas = ref;
  };

  handleMouseEnter = () => {
    if (!this.rfb) {
      return;
    }

    document.activeElement && document.activeElement.blur();
    this.rfb.get_keyboard().grab();
    this.rfb.get_mouse().grab();
  };

  handleMouseLeave = () => {
    if (!this.rfb) {
      return;
    }

    this.rfb.get_keyboard().ungrab();
    this.rfb.get_mouse().ungrab();
  };

  render() {
    return (
      <canvas
        style={this.props.style}
        ref={this.registerChild}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      />
    );
  }
}
