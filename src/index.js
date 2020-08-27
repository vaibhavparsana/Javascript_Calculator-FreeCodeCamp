import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      str: "",
      eyeFind: /[+|*|/]$/g,
      find: /[+|*|/|-]$/g,
      prevKey: "",
      flag: false,
      prevCharIndex: "",
      equ: ""
    }
    this.handleEnter = this.handleEnter.bind(this);
  }
  componentDidMount() {
    document.getElementById('one').addEventListener('click', this.handleEnter);
    document.getElementById('two').addEventListener('click', this.handleEnter);
    document.getElementById('three').addEventListener('click', this.handleEnter);
    document.getElementById('four').addEventListener('click', this.handleEnter);
    document.getElementById('five').addEventListener('click', this.handleEnter);
    document.getElementById('six').addEventListener('click', this.handleEnter);
    document.getElementById('seven').addEventListener('click', this.handleEnter);
    document.getElementById('eight').addEventListener('click', this.handleEnter);
    document.getElementById('nine').addEventListener('click', this.handleEnter);
    document.getElementById('zero').addEventListener('click', this.handleEnter);
    document.getElementById('clear').addEventListener('click', this.handleEnter);
    document.getElementById('equals').addEventListener('click', this.handleEnter);
    document.getElementById('add').addEventListener('click', this.handleEnter);
    document.getElementById('subtract').addEventListener('click', this.handleEnter);
    document.getElementById('divide').addEventListener('click', this.handleEnter);
    document.getElementById('multiply').addEventListener('click', this.handleEnter);
    document.getElementById('decimal').addEventListener('click', this.handleEnter);
  }

  handleEnter(event) {
    const eye = event.target.textContent;

    switch (eye) {
      case 'AC':
        this.setState(({
          equ: "0",
          prevKey: 'clear',
          flag: false,
          result: "0",
        }));
        this.setState((state) => ({
          str: state.equ
        }));
        break;

      case '=':
        let formula = this.state.equ.toString();
        if (formula[formula.length - 1] === ".") {
          formula = formula.slice(0, -1);
        }
        if (formula.lastIndexOf(formula.match(this.state.find)) > -1) {
          formula = formula.slice(0, -1);
          if (formula.lastIndexOf(formula.match(this.state.find)) > -1) {
            formula = formula.slice(0, -1);
          }
        }
        var result = Math.round(1000000000000 * eval(formula)) / 1000000000000;
        this.setState((state) => ({
          equ: result,
          flag: false,
          formula: result,
          prevKey: 'equals'
        }));
        this.setState((state) => ({
          str: result
        }));

        break;

      case '+': case '-': case '*': case '/':
        this.setState((state) => ({
          equ: state.equ.toString()
        }))
        this.setState((state) => ({
          prevCharIndex: state.equ.lastIndexOf(state.equ.match(/[+|*|/|-]$/g))
        }));


        if (this.state.equ === '0' && eye === "-") {
          this.setState({
            equ: eye
          })
        }


        if (this.state.equ.lastIndexOf(this.state.equ.match(this.state.find)) !== -1 && eye.match(this.state.eyeFind) !== null) {
          if ((this.state.equ.charAt(this.state.prevCharIndex - 1).match(this.state.find) !== null)) {
            this.setState((state) => ({
              equ: state.equ.substr(0, state.prevCharIndex - 1) + eye
            }));
          } else {
            this.setState((state) => ({
              equ: state.equ.substr(0, state.prevCharIndex) + eye
            }));
          }
        } else if (this.state.equ.lastIndexOf(this.state.equ.match(this.state.eyeFind)) !== -1 && eye === "-") {
          this.setState((state) => ({
            equ: state.equ + eye
          }));
        } else if (this.state.equ.lastIndexOf(this.state.equ.match(this.state.find)) !== -1 && eye === "-") {
          this.setState((state) => ({
            equ: state.equ.substr(0, state.prevCharIndex) + eye
          }));
        }
        else if (this.state.equ !== '' && this.state.equ[this.state.equ.length - 1].match(this.state.find) === null) {
          this.setState((state) => ({
            equ: state.equ + eye
          }));
        }
        else if (this.state.equ === '' && eye === '-') {
          this.setState({
            equ: eye
          });
        }
        this.setState((state) => ({
          str: state.equ
        }))
        this.setState({
          prevKey: 'operator',
          flag: false
        });
        break;

      case '.':
        if (!this.state.flag && this.state.prevKey !== 'equals') {
          this.setState((state) => ({
            equ: state.equ + eye,
            flag: true,
            prevKey: 'decimal'
          }));
          this.setState((state) => ({
            str: state.equ
          }));
        } else if (this.state.equ === "0" || this.state.prevKey === 'equals') {
          this.setState(({
            equ: "0" + eye,
            flag: true,
            prevKey: 'decimal'
          }));
          this.setState((state) => ({
            str: state.equ
          }));
        }
        break;
      default:
        this.setState((state) => ({
          equ: state.equ.toString()
        }));
        if (this.state.equ.length > 2) {
          var tempVal = this.state.equ[this.state.equ.length - 2];
          var tempIndex = this.state.equ.lastIndexOf(tempVal.match(this.state.find));
        }


        if (this.state.equ === '0' || this.state.prevKey === 'equals') {
          this.setState({
            equ: eye
          });

          this.setState((state) => ({
            str: state.equ,
            prevKey: 'number'
          }));

        } else if (tempIndex !== -1 && this.state.equ[tempIndex + 1] === '0' && eye.match(/[0-9]$/g)) {
          this.setState((state) => ({
            equ: state.equ
          }));
          this.setState((state) => ({
            str: state.equ,
            prevKey: 'number',
          }));
        } else {
          this.setState((state) => ({
            equ: state.equ + eye
          }));
          this.setState((state) => ({
            str: state.equ,
            prevKey: 'number',
          }));
        }
        break;
    }
  }

  render() {
    return (<div>

      <div id="buttons">
        <span id="display">{this.state.str}</span>
        <button id="clear">AC</button>
        <button id="divide">/</button>
        <button id="multiply">*</button>
        <button id="seven">7</button>
        <button id="eight">8</button>
        <button id="nine">9</button>
        <button id="subtract">-</button>
        <button id="four">4</button>
        <button id="five" >5</button>
        <button id="six" >6</button>
        <button id="add" >+</button>
        <button id="one">1</button>
        <button id="two" >2</button>
        <button id="three">3</button>
        <button id="zero">0</button>
        <button id="decimal">.</button>
        <button id="equals">=</button>
      </div>
    </div>
    )
  }
};

ReactDOM.render(<MyApp />, document.getElementById("root"));
