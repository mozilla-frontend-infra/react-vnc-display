import React from 'react';
import { render } from 'react-dom';
import { Stories, Story, Props } from 'neutrino-preset-react-components/lib';
import { VncDisplay } from './components/VncDisplay';

const root = document.getElementById('root');

render((
  <Stories>
    <Story component={VncDisplay}>
      <Props
        name="Default"
        url="wss://elivkcqaaaavzvu5ycwplal7l6arizjlw5fvqhuwriqggfvx.taskcluster-worker.net:35111/WWs-dvyhSMmhtD9s0-nXeg/display.sock?display=%3A0.0" />
    </Story>
  </Stories>
), root);