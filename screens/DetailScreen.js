import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";

import styles from "../styles";

const DetailScreen = ({navigation}) => {
  // Function to handle the log in button press
  const handleLoginPress = () => {
    // Redirect to the login screen
    navigation.navigate("LoginScreen");
  };

  // Function to handle the log in button press
  const handleApiTestPress = () => {
    // Redirect to the login screen
    navigation.navigate("ApiTest");
  };
  // Render the DetailScreen with or without the "Log In" button
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Details</Text>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.loginText}>You are logged in!</Text>
        <TouchableOpacity style={styles.button} onPress={handleApiTestPress}>
          <Text style={styles.buttonText}>ApiTest</Text>
        </TouchableOpacity>
        {/* Add any additional content you want to display when logged in */}
      </ScrollView>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailScreen;
