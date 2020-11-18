import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

// evaluate the input string. trims off anything other than a number at end of string
function evaluate(input) {
  if (input !== 0) {
    if (/[^0-9]/.test(input.slice(-1))) {
      input = input.slice(0, -1);
    }
    return Function('return ' + input)();
  }
  return 0;
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "0",
      output: "0",
      currentChar: "",
      hasDecimal: false
    };
    this.handleInput = this.handleInput.bind(this);
  }

  // main method to handle all the varius input cases
  handleInput(e) {
    // run evaluate if enter key is pressed, set output display to show formula
    if (e.target.value === "=") {
      this.setState({ output: this.state.input, input: evaluate(this.state.input) });
    }
    // clear input, output, currentChar if AC key is pressed
    else if (e.target.value === "clear") {
      this.setState({ input: 0, output: 0, currentChar: "" });
    }
    /* 
    if input screen is clear, allow only numbers or '-' or '.' 
    clear the initial zero before adding matching input
    */
    else if (this.state.input == 0) {
      if (/[0-9]|-|\./.test(e.target.value)) {
        this.setState({
          input: e.target.value,
          currentChar: e.target.value,
          hasDecimal: e.target.value === '.' ? true : false
        });
      }
    }
    /*
    if input screen is not zero, and key pressed is an operator,
    and currentChar is not also an operator, append operator to end of input 
    */
    else if (/\*|\/|\+|-/.test(e.target.value)) {
      if (/[0-9]/.test(this.state.currentChar)) {
        this.setState({
          input: this.state.input + e.target.value,
          currentChar: e.target.value,
          hasDecimal: false
        });
      }
      // allow '-' after an operator other than itself
      else if(this.state.currentChar !== '-' && e.target.value === '-'){
        this.setState({
          input: this.state.input + e.target.value,
          currentChar: e.target.value,
          hasDecimal: false
        });
      }
      // if last char is '-' and a '+' is entered, replace it
      else if(this.state.currentChar === '-' && e.target.value === '+'){
        this.setState({
          input: this.state.input.slice(0,-2) + e.target.value,
          currentChar: e.target.value,
          hasDecimal: false
        });
      }
      // if last char is an operator, replace with new operator if one is entered
      else if(/[^0-9]/.test(this.state.currentChar)){
        this.setState({
          input: this.state.input.slice(0,-1) + e.target.value,
          currentChar: e.target.value
        });
      }
    }
    // make sure there's only one decimal allowed
    else if (e.target.value === '.') {
      if (!this.state.hasDecimal) {
        this.setState({
          input: this.state.input + '.',
          currentChar: '.',
          hasDecimal: true
        });
      }
    }
    else {
      this.setState({
        input: this.state.input + e.target.value,
        currentChar: e.target.value
      });
    }
  }


  render() {
    return (
      <div className="calcBackground" >
        <OutputScreen className="output" value={this.state.output} />
        <InputScreen className="input" value={this.state.input} />
        <div id="buttonBackground">
          <button id="clear" value="clear" onClick={this.handleInput}>AC</button>
          <button id="divide" value="/" className="operator" onClick={this.handleInput}>/</button>
          <button id="multiply" value="*" className="operator" onClick={this.handleInput}>*</button>
          <button id="subtract" value="-" className="operator" onClick={this.handleInput}>-</button>
          <button id="seven" value="7" onClick={this.handleInput}>7</button>
          <button id="eight" value="8" onClick={this.handleInput}>8</button>
          <button id="nine" value="9" onClick={this.handleInput}>9</button>
          <button id="four" value="4" onClick={this.handleInput}>4</button>
          <button id="five" value="5" onClick={this.handleInput}>5</button>
          <button id="six" value="6" onClick={this.handleInput}>6</button>
          <button id="add" value="+" className="operator" onClick={this.handleInput}>+</button>
          <button id="one" value="1" onClick={this.handleInput}>1</button>
          <button id="two" value="2" onClick={this.handleInput}>2</button>
          <button id="three" value="3" onClick={this.handleInput}>3</button>
          <button id="zero" value="0" onClick={this.handleInput}>0</button>
          <button id="decimal" value="." onClick={this.handleInput}>.</button>
          <button id="equals" value="=" onClick={this.handleInput}>=</button>
        </div>
      </div>
    )
  }

}

class InputScreen extends React.Component {
  render() {
    return (
      <div id="display" className={this.props.className} value={this.props.value}>{this.props.value}</div>
    );
  }
}

class OutputScreen extends React.Component {
  render() {
    return (
      <div className={this.props.className} value={this.props.value}>{this.props.value}</div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Calculator />

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
