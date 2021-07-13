import React, { Component } from 'react';
import Drinks from './components/Drinks';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Drinks/>
    );
  }
}
