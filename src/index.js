import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { create, all } from 'mathjs'

const math = create(all);
const arith = [ '+', '-', '*', '/'];

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dispVal: '',
      operatorCount: 1,
      availDots: 1,
    };
  }

  NumberHandleClick(i) {
    if (i === "." && this.state.availDots < 1) {
      return;
    }
    else if (i === ".") {
      this.setState({
        availDots: this.state.availDots - 1,
      });
    }
    this.setState({
      dispVal: this.state.dispVal + i,
      operatorCount: 0,
    });
  }

  OperatorHandleClick(i) {
    if( this.state.operatorCount < 1 && arith.includes(i)) {
      this.setState({
        operatorCount: this.state.operatorCount + 1,
        dispVal: `${this.state.dispVal} ${i} `,
        availDots: 1,
      });
    }

    if( i === 'CC') {
      this.setState({
        dispVal: '',
        operatorCount: 0,
        availDots: 1,
      });
    }
    else if ( i === '=' && this.state.operatorCount === 0) {
      const res = CalculateExpression(this.state.dispVal);
      this.setState({
        dispVal: res,
      });
    }

    else {
      return;
    }
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
          <NumberGroup 
            onClick = {i => this.NumberHandleClick(i)}
          />
        </div>
        <div className="col-sm-4">
          <OperatorGroup 
            onClick = {i => this.OperatorHandleClick(i)}
          />
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
        onClick={() => this.props.onClick(i)}
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
      <div className = "btn btn-primary btn-block" onClick={() => this.props.onClick() }> { this.props.value } </div>
    );
  }
}

class OperatorGroup extends React.Component {
  renderOperator(i){
    return(
      <Operator
        value={i}
        onClick = {() => this.props.onClick(i)}
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
      <div className = "btn btn-primary btn-block mb-2" onClick={() => this.props.onClick()}> { this.props.value } </div>
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

function CalculateExpression(expr) {
  return math.evaluate(expr);
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);