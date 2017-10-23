class InputField extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };
  render() {
    return (
      <form>
        <input type="text" value={this.props.text}/>
        <button>Add</button>
      </form>
    )
  }
}

class TodoItem extends React.Component {
  static propTypes = {
    todoitem: PropTypes.object.isRequired
  };
  render() {

  }
}

class TodoList extends React.Component {
  static propTypes = {
    items: PropTypes.array,
  };
  render() {
    let count = 0;
    let todoItems = [];
    this.props.items.forEach(function (item) {
      count += 1;

      todoItems.push(
        <TodoItem key={count} todoitem={item}/>
      )
    });
    return <div>{todoItems}</div>
  }
}

class TodoApp extends React.Component {
  render() {
    return (
      <div>
        <h3>TODO</h3>
        <InputField text=""/>
        <TodoList items={[]}/>
      </div>
    )
  }
}