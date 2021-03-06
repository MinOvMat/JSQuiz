'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pubsub = require('./pubsub.js');

var _pubsub2 = _interopRequireDefault(_pubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var questArr = [{
    'question': 'Was ist der Sinn des Lebens?',
    'answers': [{
      'text': '42',
      'isCorrect': true
    }, {
      'text': 'Falsch',
      'isCorrect': false
    }, {
      'text': 'Falsch',
      'isCorrect': false
    }, {
      'text': 'Falsch',
      'isCorrect': false
    }]
  }, {
    'question': 'Frage 2',
    'answers': [{
      'text': 'Richtig',
      'isCorrect': true
    }, {
      'text': 'Falsch',
      'isCorrect': false
    }, {
      'text': 'Falsch',
      'isCorrect': false
    }, {
      'text': 'Falsch',
      'isCorrect': false
    }]
  }, {
    'question': 'Frage 3',
    'answers': [{
      'text': 'Richtig',
      'isCorrect': true
    }, {
      'text': 'Falsch',
      'isCorrect': false
    }, {
      'text': 'Falsch',
      'isCorrect': false
    }, {
      'text': 'Falsch',
      'isCorrect': false
    }]
  }, {
    'question': 'Frage 4',
    'answers': [{
      'text': 'Richtig',
      'isCorrect': true
    }, {
      'text': 'Falsch',
      'isCorrect': false
    }, {
      'text': 'Falsch',
      'isCorrect': false
    }, {
      'text': 'Falsch',
      'isCorrect': false
    }]
  }];

  var indexTracker = 0;
  _randomizeArray(questArr);

  _pubsub2.default.subscribe('prevQuestion', function sndPrvQstn() {
    indexTracker--;
    _sendQuestion();
  });
  _pubsub2.default.subscribe('nextQuestion', function sndNxtQstn() {
    indexTracker++;
    _sendQuestion();
  });

  _pubsub2.default.subscribe('answerChosen', function saveAnswer(data) {
    questArr[indexTracker].answered = data;
  });

  function _sendQuestion() {
    if (indexTracker == questArr.length) {
      _pubsub2.default.emit('finishQuiz', questArr);
    } else {
      _pubsub2.default.emit('questionSent', questArr[indexTracker]);
      if (indexTracker == 0) {
        _pubsub2.default.emit('firstQuestion', '');
      } else if (indexTracker == questArr.length - 1) {
        _pubsub2.default.emit('lastQuestion', '');
      }
    }
  }

  function init(args) {
    _sendQuestion();
  };

  function _randomizeArray(arr) {
    var array = arr;
    for (var i = 0; i < array.length; i++) {
      var randIndex = Math.floor(Math.random() * array.length);
      var tmp = array[i];
      array[i] = array[randIndex];
      array[randIndex] = tmp;
      if (array[randIndex].answers) {
        _randomizeArray(array[randIndex].answers);
      }
    };
  };

  return {
    init: init
  };
}();
