import React, { ReactNode } from 'react';
import { ScrollViewProps, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { THEME } from '../../config/theme';
import { useAppContext } from '../../contexts/app';

const Screen = ({
  children,
  contentContainerStyle,
  style,
  ...props
}: ScrollViewProps & { children: ReactNode }) => {
  const { isDarkMode } = useAppContext();
  const { colors } = THEME;
  return (
    <KeyboardAwareScrollView
      {...props}
      style={style}
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.screen,
        { backgroundColor: isDarkMode ? colors.background.dark : colors.background.light },
        contentContainerStyle,
      ]}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
  },
});

export default Screen;
