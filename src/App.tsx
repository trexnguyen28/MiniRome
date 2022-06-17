import React, {useRef, useState} from 'react';
import {StatusBar, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
//
import {ColorPalates} from '@themes';
import {CoreWebView, SearchHeader} from '@components';
import {WebViewNavigation} from 'react-native-webview/lib/WebViewTypes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalates.background,
  },
});

const App = () => {
  const [uri, setUri] = useState('');
  const [canGoBack, setCanGoBack] = useState(false);

  const searchInputRef = useRef<TextInput>(null);

  const onBrowse = (siteUrl: string) => {
    const finalUrl =
      !siteUrl.startsWith('https://') && !siteUrl.startsWith('http://')
        ? 'https://' + siteUrl
        : siteUrl;

    setUri(finalUrl);
  };

  const onBlur = () => {
    if (searchInputRef.current && !!uri) {
      searchInputRef.current.setNativeProps({text: uri});
    }
  };

  const onNavigationStateChange = (event: WebViewNavigation) => {
    if (event.url && searchInputRef.current) {
      setUri(event.url);
      searchInputRef.current.setNativeProps({text: event.url});
    }
    //
    setCanGoBack(event.canGoBack);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <SearchHeader
          onBlur={onBlur}
          onSearch={onBrowse}
          ref={searchInputRef}
        />
        {uri ? (
          <CoreWebView
            uri={uri}
            onNavigationStateChange={onNavigationStateChange}
          />
        ) : null}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export {App};
