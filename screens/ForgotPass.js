import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

// Simulated API function for requesting a password reset
const requestPasswordReset = async (email) => {
  // Send an API request to your server to initiate the password reset process
  // This is where you would call your backend endpoint to send the reset email
  // You should handle errors and success accordingly
  // In this example, we simulate a successful request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000); // Simulate a 2-second API request
  });
};

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      const success = await requestPasswordReset(email);
      if (success) {
        Alert.alert('Password Reset Email Sent', 'Check your email for instructions.');
      } else {
        Alert.alert('Password Reset Failed', 'Please check your email and try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Password Reset Failed', 'An error occurred while sending the reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Forgot Password?</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, width: 250, marginVertical: 20 }}
      />
      <Button
        title="Reset Password"
        onPress={handleResetPassword}
        disabled={loading}
      />
    </View>
  );
};

export default ForgotPass;
