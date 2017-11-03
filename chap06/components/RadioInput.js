class RadioInput extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    if (evt.target.checked)
      this.props.onChange(this.props.option);
  }

  render() {
    return (
      <label>
        <input type="radio"
               checked={this.props.checked}
               onChange={this.handleChange}/>
        {this.props.option}
      </label>
    )
  }
}

window.RadioInput = RadioInput;