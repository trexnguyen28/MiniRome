import React, {useRef, useState} from 'react';
import WebView, {WebViewProps} from 'react-native-webview';
import {ScrollView} from 'react-native-gesture-handler';
import {RefreshControl, Dimensions, StyleSheet} from 'react-native';
import {
  WebViewScrollEvent,
  WebViewNavigationEvent,
} from 'react-native-webview/lib/WebViewTypes';

const styles = StyleSheet.create({
  view: {flex: 1, height: '100%'},
});

const CoreWebView: React.FC<WebViewProps> = ({...webViewProps}) => {
  const [height, setHeight] = useState(Dimensions.get('screen').height);
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
    webViewProps.onScroll && webViewProps.onScroll(e);
  };

  const onLoad = (e: WebViewNavigationEvent) => {
    setIsRefreshing(false);
    webViewProps.onLoad && webViewProps.onLoad(e);
  };

  return (
    <ScrollView
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
      <WebView
        {...webViewProps}
        ref={webViewRef}
        onLoad={onLoad}
        onScroll={onWebViewScroll}
        style={[styles.view, {height}, webViewProps.style]}
      />
    </ScrollView>
  );
};

export {CoreWebView};
