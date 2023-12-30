// TaskReminderPage.js

import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';

const TaskReminderPage = () => {
  const formik = useFormik({
    initialValues: {
      taskName: '',
      reminderDate: new Date(),
      priority: 'low',
    },
    onSubmit: values => {
      console.log('Task details:', values);
      // Add logic to save the task
    },
  });

  const handleDateChange = (event, selectedDate) => {
    formik.setFieldValue('reminderDate', selectedDate || formik.values.reminderDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Reminder</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task name"
        value={formik.values.taskName}
        onChangeText={formik.handleChange('taskName')}
      />

      <Text style={styles.label}>Select Reminder Date:</Text>
      <Button
        title="Select a date"
        onPress={() => formik.setFieldTouched('reminderDate', true)}
      />
      {formik.touched.reminderDate && (
        <DateTimePicker
          value={formik.values.reminderDate}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Priority:</Text>
      <View style={styles.radioContainer}>
        <RadioButton.Group
          onValueChange={value => formik.setFieldValue('priority', value)}
          value={formik.values.priority}
        >
          <View style={styles.radioButton}>
            <Text>Low</Text>
            <RadioButton value="low" />
          </View>
          <View style={styles.radioButton}>
            <Text>Medium</Text>
            <RadioButton value="medium" />
          </View>
          <View style={styles.radioButton}>
            <Text>High</Text>
            <RadioButton value="high" />
          </View>
        </RadioButton.Group>
      </View>

      <Button title="Add Task" onPress={formik.handleSubmit} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TaskReminderPage;
