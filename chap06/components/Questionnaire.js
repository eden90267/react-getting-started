const QuesTitle = window.QuesTitle;
const QuesList = window.QuesList;

class Questionnaire extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toAnswer: 0
    };
    this.answerHandler = this.answerHandler.bind(this);
  }

  answerHandler(toAnswer) {
    this.setState({toAnswer});
  }

  componentWillMount() {
    this.questions = [
      {
        "question": "性別",
        "options": ["男", "女"]
      },
      {
        "question": "年齡",
        "options": ["18 歲以下", "18~25 歲", "26~35 歲", "35 歲以上"]
      },
      {
        "question": "婚姻狀況",
        "options": ["未婚", "已婚"]
      },
    ];
    this.setState({toAnswer: this.questions.length});
  }

  render() {
    return (
      <div>
        <QuesTitle toAnswer={this.state.toAnswer}/>
        <QuesList questions={this.questions}
                  answerHandler={this.answerHandler}/>
      </div>
    );
  }
}

window.Questionnaire = Questionnaire;