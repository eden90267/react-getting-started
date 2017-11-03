class QuesTitle extends React.Component {
  render() {
    return (
      <div>
        <h1>問卷調查表</h1>
        <small>{this.props.toAnswer} 項問題待填寫</small>
      </div>
    );
  }
}

window.QuesTitle = QuesTitle;