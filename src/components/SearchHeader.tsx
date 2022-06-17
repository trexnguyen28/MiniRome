import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  Pressable,
} from 'react-native';
import {ColorPalates, fontStyles} from '@themes';
import {BackArrowIcon} from '@assets';

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  searchBox: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    backgroundColor: ColorPalates.searchBox,
  },
  searchText: {
    ...fontStyles.Title,
    color: ColorPalates.text,
  },
});

interface SearchHeaderProps {
  onBlur: () => void;
  onGoBack?: () => void;
  enableGoBack?: boolean;
  onSearch: (text: string) => void;
}

const SearchHeader = React.forwardRef<TextInput, SearchHeaderProps>(
  ({onSearch, onBlur, onGoBack, enableGoBack}, forwardRef) => {
    const onSubmitEditing = (
      e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
    ) => {
      onSearch(e.nativeEvent.text);
    };

    return (
      <View style={styles.container}>
        {enableGoBack ? (
          <Pressable onPress={onGoBack} style={{paddingRight: 16}}>
            <BackArrowIcon />
          </Pressable>
        ) : null}
        <View style={styles.searchBox}>
          <TextInput
            onBlur={onBlur}
            ref={forwardRef}
            autoCorrect={false}
            returnKeyType={'go'}
            autoCapitalize={'none'}
            style={styles.searchText}
            keyboardType={'web-search'}
            onSubmitEditing={onSubmitEditing}
            placeholder={'Type your address here'}
            placeholderTextColor={ColorPalates.placeholder}
          />
        </View>
      </View>
    );
  },
);

export {SearchHeader};
