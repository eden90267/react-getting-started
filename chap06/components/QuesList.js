const QuesItem = window.QuesItem;

class QuesList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      answered: 0
    };

    this.handleAnswer = this.handleAnswer.bind(this);
  }

  handleAnswer() {
    let newAnswered = this.state.answered + 1,
      toAnswer = this.props.questions.length - newAnswered;

    this.setState({answered: newAnswered});
    this.props.answerHandler(toAnswer);
  }

  render() {
    let quesItems = this.props.questions.map((quesInfo, i) => (
      <QuesItem
        key={i}
        question={quesInfo.question}
        options={quesInfo.options}
        handleAnswer={this.handleAnswer}/>
    ));
    return (
      <div>
        <p>請撥冗填寫本問卷，提供寶貴的資訊，謝謝！</p>
        <ul>
          {quesItems}
        </ul>
      </div>
    );
  }
}

QuesList.defaultProps = {
  questions: []
};

window.QuesList = QuesList;