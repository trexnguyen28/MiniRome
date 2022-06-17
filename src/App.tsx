import React from 'react';
import {ColorPalates} from '@themes';
import {StatusBar, StyleSheet, SafeAreaView, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalates.white,
  },
});

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{flex: 1, backgroundColor: 'blue'}} />
    </SafeAreaView>
  );
};

export {App};
