const RadioInput = window.RadioInput;

class QuesItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onChange = this.onChange.bind(this);

    this.state = {
      option: ''
    };
  }

  onChange(option) {
    if (this.state.option === '') {
      this.props.handleAnswer();
    }
    this.setState({option});
  }

  generateOps() {
    return this.props.options.map((option, i) => (
      <RadioInput
        key={'option' + i}
        option={option}
        checked={this.state.option === option}
        onChange={this.onChange}
      />
    ));
  }

  render() {
    return (
      <div>
        <li>{this.props.question}</li>
        {this.generateOps()}
      </div>
    );
  }
}

window.QuesItem = QuesItem;