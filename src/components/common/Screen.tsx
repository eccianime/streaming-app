import React, { ReactNode } from "react";
import { ScrollViewProps, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Screen = ({ children, contentContainerStyle, style, ...props }: ScrollViewProps & { children: ReactNode; }) => {
    return (
        <KeyboardAwareScrollView
            {...props}
            style={style}
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.screen, contentContainerStyle]}
        >
            {children}
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flexGrow: 1,
    }
});

export default Screen;