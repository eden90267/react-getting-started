class Clock extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      date: new Date()
    };
  }

  componentWillMount() {
    console.log('[MOUNT] clock will mount.');
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>Hi, {this.props.visitor}! 現在時間是: {this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }

  componentDidMount() {
    console.log('[MOUNT] clock did mount');
    console.log('        > curent vistor: ' + this.props.visitor);
    console.log('        > set a timer to tick every second.');
    this.timeID = setInterval(() => this.tick(), 1000);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log('[ALIVE] clock will receive props.');
    console.log('        > next vistor: ' + nextProps.visitor);
  }

  shouldComponentUpdate() {
    let shouldUpdate = true;
    console.log('[ALIVE] clock should update?');
    console.log('   > ' + shouldUpdate ? 'YES' : 'NO');

    return true;
  }

  componentWillUpdate() {
    console.log('[ALIVE] clock will update.');
  }

  componentDidUpdate() {
    console.log('[ALIVE] clock did update.');
    console.log('        > Tick-Tock!');
  }

  componentWillUnmount() {
    console.log('[UNMOUNT] clock will unmount.');
    clearInterval(this.timeID);
    console.log('       > Timer is cleared.');
  }
}

var Home = (<Clock visitor="John" />);

ReactDOM.render(
  Home,
  document.getElementById('app')
);

setTimeout(() => {
  Home = ( < Clock visitor = "Mary" / > );

  ReactDOM.render(
    Home,
    document.getElementById('app')
  );
}, 3000);

setTimeout(() => {
  Home = (
    <div>
      <h2>Clock is gone</h2>
    </div>
  );
  ReactDOM.render(
    Home,
    document.getElementById('app')
  );
}, 6000);