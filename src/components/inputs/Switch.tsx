import { Pressable, View } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { SwitchProps } from '../../types/components';

const AnimatedView = Animated.createAnimatedComponent(View);

const Switch = ({ initialState = false, onChange }: SwitchProps) => {
  const leftPosition = useRef(new Animated.Value(initialState ? 18 : 2)).current;
  useEffect(() => {
    Animated.timing(leftPosition, {
      toValue: initialState ? 18 : 2,
      useNativeDriver: false,
      duration: 200,
    }).start();
  }, [initialState]);

  return (
    <Pressable
      bg={initialState ? 'primary.500' : 'gray.200'}
      h={6}
      w={10}
      rounded="full"
      justifyContent={'center'}
      onPress={() => onChange(!initialState)}
    >
      <AnimatedView
        left={leftPosition}
        position={'absolute'}
        h={5}
        w={5}
        rounded="full"
        bg="white"
      />
    </Pressable>
  );
};

export default Switch;
