import { ITextProps, Text as NBText } from 'native-base';
import React from 'react';
import { THEME } from '../../config/theme';
import { useAppContext } from '../../contexts/app';

const Text = (props: ITextProps) => {
  const { isDarkMode } = useAppContext();
  const { colors } = THEME;
  return (
    <NBText color={isDarkMode ? colors.textColor.dark : colors.textColor.light} {...props}>
      {props.children}
    </NBText>
  );
};

export default Text;
