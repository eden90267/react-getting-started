class InputField extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <input value={this.props.text}
               onChange={this.props.handleChange}/>
        <button>Add</button>
      </form>
    );
  }
}

class TodoItem extends React.Component {
  render() {
    return <li>{this.props.todoitem}</li>;
  }
}

class TodoList extends React.Component {
  render() {
    let count = 0;
    let todoItems = [];
    this.props.items.forEach(function (item) {
      count += 1;

      todoItems.push(<TodoItem key={count} todoitem={item}/>)
    });
    return <ul>{todoItems}</ul>;
  }
}

class TodoApp extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      text: '',
      items: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      items: [
        ...this.state.items,
        this.state.text
      ],
      text: ''
    });
  }

  handleChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <InputField text={this.state.text}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}/>
        <TodoList items={this.state.items}/>
      </div>
    )
  }
}

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('app')
);