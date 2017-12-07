import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { Provider } from 'mobx-react'
import store from './mobx/store'
import RootTabs from './routes/routes'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    }
  }



  render() {
    return (
      <Provider store={store}>
        <RootTabs />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('main', () => App);
