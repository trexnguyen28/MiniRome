import React, {useEffect, useRef, useState} from 'react';
import WebView, {WebViewProps} from 'react-native-webview';
import {ScrollView} from 'react-native-gesture-handler';
import {View, RefreshControl, Dimensions, StyleSheet, Text} from 'react-native';
import {WebViewScrollEvent} from 'react-native-webview/lib/WebViewTypes';
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

interface CoreWebViewProps
  extends Pick<
    WebViewProps,
    'onLoadProgress' | 'onLoadStart' | 'onLoadEnd' | 'onNavigationStateChange'
  > {
  uri: string;
  onRefresh: () => void;
}

const CoreWebView = React.forwardRef<WebView, CoreWebViewProps>(
  (
    {
      uri,
      onRefresh,
      onLoadStart,
      onLoadEnd,
      onLoadProgress,
      onNavigationStateChange,
    },
    webViewRef,
  ) => {
    const [height, setHeight] = useState(Dimensions.get('screen').height);
    const [hasError, setHasError] = useState(false);
    //
    const [isEnabled, setEnabled] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const _onRefresh = () => {
      setIsRefreshing(true);
      //
      onRefresh();
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
            onRefresh={_onRefresh}
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
            onLoadEnd={onLoadEnd}
            onHttpError={onError}
            onLoadStart={onLoadStart}
            onScroll={onWebViewScroll}
            onLoadProgress={onLoadProgress}
            renderToHardwareTextureAndroid
            style={[styles.view, {height}]}
            onNavigationStateChange={onNavigationStateChange}
          />
        ) : (
          <WebViewError text={uri} />
        )}
      </ScrollView>
    );
  },
);

export {CoreWebView};
