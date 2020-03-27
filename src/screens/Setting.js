
import React, { useContext, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
    List, Switch,
} from 'react-native-paper';
const Setting = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>

            <TouchableOpacity
                onPress={() => navigation.navigate('Feedback')}>
                <List.Item
                    title="Send Feedback"
                    left={() => <List.Icon icon="email" />}
                />
            </TouchableOpacity>
        </View >
    );
}
export default Setting;
