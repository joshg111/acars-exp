// @flow

import React, { Component } from 'react'
import { COLOR, ThemeProvider } from 'react-native-material-ui';
import { Font, Components } from 'expo';
import RootContainer from './App/Containers/RootContainer'
import { Button, TouchableOpacity, TextInput, View, ScrollView, Text, KeyboardAvoidingView } from 'react-native'

// you can set your style right here, it'll be propagated to application
const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {

  state: Object

  constructor() {
    super();

    this.state = {
      fontsAreLoaded: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Rubik-Black': require('@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('@shoutem/ui/fonts/rubicon-icon-font.ttf'),
    });

    this.setState({fontsAreLoaded: true});
  }

  render () {
    if (!this.state.fontsAreLoaded) {
      return <View><Text>loading</Text></View>;
    }
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <RootContainer />
      </ThemeProvider>

      // <ThemeProvider uiTheme={uiTheme}>
      //   <Text>asdf</Text>
      // </ThemeProvider>
    )
  }
}

export default App
