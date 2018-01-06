import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Platform } from 'react-native';
import { red, black, white, orange } from '../utils/colors';

class FlashCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flipAnimation: new Animated.Value(0),
      isFlipped: this.props.isFlipped,
    };

    this.flipCard = this.flipCard.bind(this);
  }

  componentWillMount() {
    const { flipAnimation } = this.state;

    // On Android, we've a flicker issue if both states have not been rendered.
    if (Platform.OS === 'android') {
      Animated.sequence([
        Animated.timing(flipAnimation, {
          toValue: 180,
          duration: 1,
          useNativeDriver: true,
        }),
        Animated.timing(flipAnimation, {
          toValue: 0,
          duration: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }

  get frontInterpolate() {
    const { flipAnimation } = this.state;

    return flipAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
  }

  get backInterpolate() {
    const { flipAnimation } = this.state;

    return flipAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
  }

  get frontOpacity() {
    const { flipAnimation } = this.state;

    return flipAnimation.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });
  }

  get backOpacity() {
    const { flipAnimation } = this.state;

    return flipAnimation.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    });
  }  

  flipCard() {
    const { flipAnimation, isFlipped } = this.state;

    let animationConfig = {
      friction: 6,
      tension: 20,
      useNativeDriver: true,
    };

    if (isFlipped) {
      animationConfig = {
        ...animationConfig,
        toValue: 0,
      };
    } else {
      animationConfig = {
        ...animationConfig,
        toValue: 180,
      };
    }

    Animated.spring(flipAnimation, animationConfig).start();

    this.setState({ isFlipped: !isFlipped });
  }

  render() {
    const { question, answer } = this.props;
    const frontAnimatedStyle = {
      opacity: this.frontOpacity,
      transform: [
        { rotateY: this.frontInterpolate },
      ],
    };
    const backAnimatedStyle = {
      opacity: this.backOpacity,
      transform: [
        { rotateY: this.backInterpolate },
      ],
    };
    
    return (
      <View style={styles.container}>
      <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
        <Text style={styles.flipTextFront}>
          {question}
        </Text>
      </Animated.View>
      <Animated.View style={[styles.flipCard, backAnimatedStyle, styles.flipCardBack]}>
        <Text style={styles.flipTextBack}>
          {answer}
        </Text>
      </Animated.View>      
        <TouchableOpacity onPress={this.flipCard}>
        	<Text style={{color: red}}>Answer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCard: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    backfaceVisibility: 'hidden',
    marginBottom: 10,
    marginTop: 10
  },
  flipCardBack: {
    backgroundColor: orange,
    position: 'absolute',
    top: 0
  },
  flipTextFront: {
    fontSize: 20,
    textAlign: 'center',
    color: black,
    fontWeight: 'bold',
  },
  flipTextBack: {
    fontSize: 20,
    textAlign: 'center',
    color: white,
    fontWeight: 'bold',
  },
});

export default FlashCard;