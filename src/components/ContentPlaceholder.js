import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade,
} from 'rn-placeholder';
const PlaceholderObject = () => {
    let placeholderobj = []
    for (let i = 0; i < 11; i++) {
        placeholderobj.push(
            <Placeholder key={i}
                Animation={Fade}
                Left={PlaceholderMedia}
                Right={PlaceholderMedia}>
                <PlaceholderLine width={80} />
                <PlaceholderLine />
                <PlaceholderLine width={30} />
            </Placeholder>)
    }
    return placeholderobj;
}
const RNPlaceHolder = () => {
    return (
        <View>
            {PlaceholderObject()}
        </View>
    );
};
export default RNPlaceHolder; 