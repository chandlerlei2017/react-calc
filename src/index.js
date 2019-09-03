import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currVal: 0,
      dispVal: '',
    };
  }
  
  render() {
    return(
      <div className="row m-5">
        <div className="col-sm-12">
          <Display 
            dispVal={this.state.dispVal}
          />
        </div>
        <div className="col-sm-8">
          <NumberGroup />
        </div>
        <div className="col-sm-4">
          <OperatorGroup />
        </div>
      </div>
    );
  }
} 

class NumberGroup extends React.Component {
  renderNumber(i){
    return(
      <Number
        value={i}
      />
    );
  }
  render() {
    return(
      <div className="row">
        <div className="col-sm-4 number-row">
          {this.renderNumber('7')}
          {this.renderNumber('4')} 
          {this.renderNumber('1')}
          {this.renderNumber('.')}
        </div>
        <div className="col-sm-4 number-row">
          {this.renderNumber('8')}
          {this.renderNumber('5')}
          {this.renderNumber('2')}
          {this.renderNumber('0')}
        </div>
        <div className="col-sm-4 number-row">
          {this.renderNumber('9')}
          {this.renderNumber('6')}
          {this.renderNumber('3')}
          {this.renderNumber('DEL')}
        </div>    
      </div> 
    );
  }
}

class Number extends React.Component {
  render() {
    return(
      <div className = "btn btn-primary btn-block" > { this.props.value } </div>
    );
  }
}

class OperatorGroup extends React.Component {
  renderOperator(i){
    return(
      <Operator
        value={i}
      />
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          {this.renderOperator('CC')}
        </div>
        <div className="col-sm-6">
          {this.renderOperator('+')}
        </div>
        <div className="col-sm-6">
          {this.renderOperator('-')}
        </div>      
        <div className="col-sm-6">
          {this.renderOperator('*')}
        </div>      
        <div className="col-sm-6">
          {this.renderOperator('/')}
        </div>      
        <div className="col-sm-12">
          {this.renderOperator('=')}
        </div>            
      </div>
    );
  }
}

class Operator extends React.Component {
  render() {
    return(
      <div className = "btn btn-primary btn-block mb-2" > { this.props.value } </div>
    );
  }
}

class Display extends React.Component {
  render() {
    return (
      <div className="display rounded mb-5 text-right pr-5">
        <h2 style={{lineHeight: 200 + 'px'}}>{this.props.dispVal}</h2>
      </div>
    );
  }
}


ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);