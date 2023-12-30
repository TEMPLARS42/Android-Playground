import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Alert,
  Button
} from 'react-native';

const Login = ({ navigation }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors, isSubmitting, dirtyFields },
    setValue,
    setError,
    clearErrors,
    watch,
  } = useForm({ mode: 'onChange' });

  const handleLogin = async (data) => {
    try {
      if(!data.email){
        Alert.alert('Enter email');
        return
      }
      if(!data.password){
        Alert.alert('Enter password');
        return
      }

      const response = await axios.post('http://10.0.2.2:5000/login', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      await AsyncStorage.setItem('token', response.data.token);
      navigation.replace('Home')
    }
    catch (error) {
      console.error(error.message);
      Alert.alert('Please try again');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              label="Email"
              placeholder="Enter your email here"
              value={value}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              style={styles.input}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              label="Password"
              placeholder="Enter your password here"
              value={value}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              secureTextEntry
              style={styles.input}
            />
          )}
        />
        <Button title="Login" onPress={handleSubmit(handleLogin)} />

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <Button
            title="Signup"
            onPress={() => navigation.navigate('Signup')}
            style={styles.signupButton} // Add custom style to the signup button
          />
        </View>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupText: {
    marginRight: 8, // Add some space between text and button
  },
  signupButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;
