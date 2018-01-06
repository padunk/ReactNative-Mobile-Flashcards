import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { black, white, orange } from './utils/colors';
import { Constants, Font, AppLoading } from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import FlashCardsStatusBar from './StatusBar';
import MainNavigation from './Navigator';
import { setLocalNotification } from './utils/notifications';

const store = createStore(reducers);
const { width, height } = Dimensions.get('window');

class App extends React.Component {

  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    this._loadAssetsAsync();
    setLocalNotification();
  }

  async _loadAssetsAsync() {
    try{
      await Font.loadAsync({
      'oswaldBold': require('./assets/fonts/Oswald-Bold.ttf'),
      'oswaldRegular': require('./assets/fonts/Oswald-Regular.ttf'),
      'windSong': require('./assets/fonts/Windsong.ttf')
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets.'
      );
      console.log(e.message);
    } finally {
      this.setState({ fontLoaded: true });
    }
  }

  render() {
    if(this.state.fontLoaded){
      return (
        <Provider store={store}>
          <View style={styles.container}>
              <FlashCardsStatusBar backgroundColor={black} barStyle='light-content' />
            <View style={styles.header}>
              <Text style={styles.mainHeader}>Mobile FlashCards</Text>
            </View>
              <MainNavigation />
              <View style={styles.footer}>
                <Text style={styles.footerText}>Made by: Abraham Anak Agung</Text>
              </View>
          </View>
        </Provider>
      );
    } else {
      return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black,
    width: width,
    height: height,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
    padding: 5
  },
  mainHeader: {
    color: white,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'oswaldBold'
  },
  footer: {
    margin: 5,
    padding: 3,
    alignItems: 'flex-end',
    backgroundColor: black,
  },
  footerText: {
    fontFamily: 'windSong',
    textAlign: 'center',
    color: white
  }
});

export default App;