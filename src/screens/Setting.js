
import React, { useContext, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
    List, Switch,
} from 'react-native-paper';
import { ThemeContext } from '../components/ThemeController';

const Setting = ({ navigation }) => {
    const { toggleTheme, theme } = useContext(ThemeContext);

    return (
        <View style={{ flex: 1 }}>
            <List.Item
                title="Dark Mode"
                left={() => <List.Icon icon="brightness-4" />}
                right={() => <Switch value={theme} onValueChange={toggleTheme} />}
            />

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
