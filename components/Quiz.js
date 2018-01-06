import React, {Component} from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  StyleSheet, 
  ScrollView, 
  Platform 
} from 'react-native';
import { fetchDeck } from '../utils/api';
import { connect } from 'react-redux';
import { black, white, orange, red } from '../utils/colors';
import FlashCard from './FlashCard';
import { clearLocalNotification, setLocalNotification } from '../utils/notifications';

class Quiz extends Component {
  
	static navigationOptions = ({
		title: 'Quiz'
	});

  state = {
    idx: 0,
    correct: 0,
    max: this.props.data.questions.length - 1,
  }

  correctPress = () => {
    const { max, idx } = this.state;

    this.setState((prevState) => ({
      idx: prevState.idx === max ? max : prevState.idx + 1,
      correct: prevState.correct + 1,
    }),
    () => {
      if(idx === max) {
        return this.showResult();
      }
    }
    )
  }

  incorrectPress = () => {
    const { max, idx } = this.state;

    this.setState((prevState) => ({
      idx: prevState.idx === max ? max : prevState.idx + 1,
    }),
    () => {
      if(idx === max) {
        return this.showResult();
      }
    }
    )
  }

  showResult = () => {
    const { correct } = this.state;
    const total = this.props.data.questions.length;
    const result = Math.round((correct/total)*100);
    const { title } = this.props.navigation.state.params;

    this.resetQuiz();

    return this.props.navigation.navigate('Result', {
      result,
      title
    });
  }

  resetQuiz = () => {
    this.setState(() => ({
    idx: 0,
    correct: 0,   
    }));

    clearLocalNotification()
    .then(setLocalNotification)
  }

  renderCard = () => {
    const { idx } = this.state;
    const { questions } = this.props.data;

    return(
      <FlashCard
        question = {questions[idx].question}
        answer = {questions[idx].answer}
        isFlipped = {false}
      />
    );
  }

  render() {
    const { title } = this.props.navigation.state.params;
    const { questions } = this.props.data;
    const { idx } = this.state;
      
    return (
      <ScrollView>
        <Text style={css.header}>{title}</Text>
        <Text>{`Question ${idx + 1} of ${questions.length}`}</Text>
          {this.renderCard()}
        <View style={css.containerBtn}>
           <TouchableOpacity
            style={Platform === 'ios' ? css.iosCorrectBtn : css.androidCorrectBtn}
            onPress={this.correctPress}
          >
             <Text>Correct</Text>
           </TouchableOpacity>

           <TouchableOpacity
            style={Platform === 'ios' ? css.iosIncorrectBtn : css.androidIncorrectBtn}
            onPress={this.incorrectPress}
          >
             <Text style={{color: white}}>Wrong</Text>
           </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, { navigation }) => {
	const title = navigation.state.params.title;
	return {
		data: state[title]
	};
};

const css = StyleSheet.create({
  header: {
    fontFamily: 'oswaldBold',
    fontSize: 30,
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  containerBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  beginBtn: {
    backgroundColor: orange,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    margin: 5
  },
  iosCorrectBtn: {
    backgroundColor: white,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    margin: 5
  },
  iosIncorrectBtn: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    margin: 5
  },
  androidCorrectBtn: {
    backgroundColor: white,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    width: 150,
    borderRadius: 5,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },  
  androidIncorrectBtn: {
    backgroundColor: red,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    width: 150,
    borderRadius: 5,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  }
});

Quiz = connect(mapStateToProps)(Quiz);

export default Quiz;