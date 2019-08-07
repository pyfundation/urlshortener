import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import MyForm from './component/form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          
          <h2 align="center">URL Shortener</h2>
          
        
        </div>

				<MyForm /> 

      </div>
    );
  }
}

export default App;
