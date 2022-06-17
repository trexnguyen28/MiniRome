import React, {useRef, useState} from 'react';
import {
  View,
  Animated,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TextInput,
  LayoutAnimation,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
//
import {ColorPalates} from '@themes';
import {CoreWebView, SearchHeader} from '@components';
import {WebViewNavigation} from 'react-native-webview/lib/WebViewTypes';
import WebView from 'react-native-webview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalates.background,
  },
  progressContainer: {
    margin: 0,
    padding: 0,
    height: 2,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
});

const App = () => {
  const [uri, setUri] = useState('');
  const [canGoBack, setCanGoBack] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);
  //
  const progressValue = useRef<Animated.Value>(new Animated.Value(0));
  const webViewRef = useRef<WebView>(null);
  const searchInputRef = useRef<TextInput>(null);

  const onBlur = () => {
    if (searchInputRef.current && !!uri) {
      searchInputRef.current.setNativeProps({text: uri});
    }
  };

  const onBrowse = (siteUrl: string) => {
    const finalUrl =
      !siteUrl.startsWith('https://') && !siteUrl.startsWith('http://')
        ? 'https://' + siteUrl
        : siteUrl;

    setUri(finalUrl);
  };

  const onLoadStart = () => {
    LayoutAnimation.easeInEaseOut();
    progressValue.current.setValue(0);
    setProgressVisible(true);
  };

  const onLoadEnd = () => {
    LayoutAnimation.easeInEaseOut();
    setProgressVisible(false);
  };

  const onRefresh = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const onGoBack = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  const onLoadProgress = Animated.event(
    [{nativeEvent: {progress: progressValue.current}}],
    {useNativeDriver: false},
  );

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
          onGoBack={onGoBack}
          enableGoBack={canGoBack}
        />
        {progressVisible ? (
          <View style={styles.progressContainer}>
            <Animated.View
              style={{
                height: '100%',
                backgroundColor: 'blue',
                width: progressValue.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                  extrapolate: 'clamp',
                }),
              }}
            />
          </View>
        ) : null}
        {uri ? (
          <CoreWebView
            uri={uri}
            ref={webViewRef}
            onRefresh={onRefresh}
            onLoadEnd={onLoadEnd}
            onLoadStart={onLoadStart}
            onLoadProgress={onLoadProgress}
            onNavigationStateChange={onNavigationStateChange}
          />
        ) : null}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export {App};
