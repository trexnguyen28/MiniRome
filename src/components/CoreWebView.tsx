import React, {useEffect, useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {ScrollView} from 'react-native-gesture-handler';
import {View, RefreshControl, Dimensions, StyleSheet, Text} from 'react-native';
import {
  WebViewNavigation,
  WebViewScrollEvent,
} from 'react-native-webview/lib/WebViewTypes';
import {ColorPalates, fontStyles} from '@themes';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    height: '100%',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    ...fontStyles.Body,
    color: ColorPalates.text,
  },
});

const WebViewError: React.FC<{text: string}> = ({text}) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{`Can not open: ${text}`}</Text>
    </View>
  );
};

interface CoreWebViewProps {
  uri: string;
  onNavigationStateChange: (event: WebViewNavigation) => void;
}

const CoreWebView: React.FC<CoreWebViewProps> = ({
  uri,
  onNavigationStateChange,
}) => {
  const [height, setHeight] = useState(Dimensions.get('screen').height);
  const [hasError, setHasError] = useState(false);
  //
  const [isEnabled, setEnabled] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const webViewRef = useRef<WebView>(null);

  const onRefresh = () => {
    if (webViewRef.current) {
      setIsRefreshing(true);
      //
      webViewRef.current.reload();
    }
  };

  const onWebViewScroll = (e: WebViewScrollEvent) => {
    setEnabled(e.nativeEvent.contentOffset.y === 0);
  };

  const onLoad = () => {
    setIsRefreshing(false);
  };

  const onError = () => {
    setHasError(true);
  };

  useEffect(() => {
    setHasError(false);
  }, [uri]);

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      onLayout={e => setHeight(e.nativeEvent.layout.height)}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          enabled={isEnabled}
        />
      }
      style={styles.view}>
      {!hasError ? (
        <WebView
          ref={webViewRef}
          source={{uri}}
          onLoad={onLoad}
          onError={onError}
          onHttpError={onError}
          onScroll={onWebViewScroll}
          renderToHardwareTextureAndroid
          style={[styles.view, {height}]}
          onNavigationStateChange={onNavigationStateChange}
        />
      ) : (
        <WebViewError text={uri} />
      )}
    </ScrollView>
  );
};

export {CoreWebView};
