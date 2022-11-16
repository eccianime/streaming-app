import { IInputProps } from 'native-base';
import { StyleProp, ViewStyle } from 'react-native';

export type InputProps =  IInputProps & {
    label?: string;
    viewStyle?: StyleProp<ViewStyle>;
}