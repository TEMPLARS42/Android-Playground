// LoadingScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ifToken()
    }, [])

    const ifToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token)
            navigation.replace('Home')
        else
            navigation.replace('Login')
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Loading...</Text>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
});

export default LoadingScreen;
