# MoniRome

A simple replicant of Google Chrome browser using React Native & Typescript

## Prerequisites

- [Node.js > 16](https://nodejs.org)
- [React Native 0.68.2](https://reactnative.dev/)
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler) for 
  scroll with RefreshControl
- [react-native-webview](https://mobx.js.org/README.html) for loading website content
- [Typescript](https://www.typescriptlang.org/) as main language and type checking.

## How to start

1. `yarn install`
2. `cd ios && pod install`
3. At the root folder: `yarn ios` or `yarn android`


## Main Feature

1. Display Website content
2. Display loading indicator for website
3. Allow user to change the website address with search input
4. Allow user pull to refresh the content of website
5. Allow user to go back to previous website
