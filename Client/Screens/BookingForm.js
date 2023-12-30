// AirportBookingPage.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AirportBookingPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [passengerName, setPassengerName] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [destination, setDestination] = useState('');
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const handleBooking = () => {
        // Implement your booking logic here
        console.log('Booking details:', {
            date: selectedDate,
            passengerName,
            flightNumber,
            destination,
        });

        // Additional logic such as making an API call for booking can be added here
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Airport Booking</Text>

            <Text style={styles.label}>Select Date:</Text>
            <Text style={styles.selectedDate}>Selected: {selectedDate.toDateString()}</Text>
            <Button title="Select a date" onPress={() => setDatePickerVisible(!datePickerVisible)} />
            {datePickerVisible && <DateTimePicker
                value={selectedDate}
                mode={'date'}
                is24Hour={true}
                onChange={(event, selectedDate) => { setSelectedDate(selectedDate), setDatePickerVisible(false) }}
            />}

            <Text style={styles.label}>Passenger Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter passenger name"
                value={passengerName}
                onChangeText={(text) => setPassengerName(text)}
            />

            <Text style={styles.label}>Flight Number:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter flight number"
                value={flightNumber}
                onChangeText={(text) => setFlightNumber(text)}
            />

            <Text style={styles.label}>Destination:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter destination"
                value={destination}
                onChangeText={(text) => setDestination(text)}
            />

            <Button title="Book Now" onPress={handleBooking} style={styles.button} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f7f7f7',  // Light background color
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#333',  // Dark text color
    },
    label: {
        fontSize: 16,
        marginTop: 15,
        marginBottom: 5,
        color: '#555',  // Medium-dark text color
    },
    selectedDate: {
        color: '#007bff',  // Primary color for selected date
    },
    input: {
        height: 40,
        borderColor: '#ccc',  // Light border color
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
        backgroundColor: '#fff',  // White background color
    },
    button: {
        backgroundColor: '#007bff',  // Primary color for the button
        color: '#fff',  // White text color
        padding: 12,
        borderRadius: 5,
        marginTop: 20,
        elevation: 3,  // Android shadow
        shadowColor: '#000',  // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});

export default AirportBookingPage;
