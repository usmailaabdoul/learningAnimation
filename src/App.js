/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView} from 'react-native';

import {Button, Intro, WhatsApp} from './screens';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <Button />
      <Intro /> */}
      <WhatsApp />
    </SafeAreaView>
  );
};

export default App;
