import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({navigation}) => {
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

  const handleSignup = async (data) => {
    try {
      const response = await axios.post('http://10.0.2.2:5000/signup', data, {
        headers: {
          'Content-Type': 'application/json', 
        }
      });

      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      navigation.replace('Home')
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Title style={{ fontSize: 24, marginBottom: 16 }}>Signup</Title>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            label="Name"
            placeholder="Enter your name here"
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            style={{ marginBottom: 16 }}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            label="Email"
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            style={{ marginBottom: 16 }}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            label="Password"
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            secureTextEntry
            style={{ marginBottom: 16 }}
          />
        )}
      />
      <Controller
        control={control}
        name="city"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            label="City"
            value={value}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            style={{ marginBottom: 16 }}
          />
        )}
      />

      <Button mode="contained" onPress={handleSubmit(handleSignup)}>
        Signup
      </Button>
    </View>
  );
};

export default SignupScreen;
