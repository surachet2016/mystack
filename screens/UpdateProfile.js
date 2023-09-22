import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import styles from "../styles";

const UpdateProfile = ({ route, navigation }) => {
  const [name, setName] = useState(route.params.name);
  const [email, setEmail] = useState(route.params.Email);
  const [id, setId] = useState(route.params.id);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkToken(); // Check token when the component mounts
  }, []);

  // Function to check if a token exists in AsyncStorage
  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        // If no token exists, navigate the user to the login screen
        navigation.navigate("LoginScreen");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProfile = async () => {
    // Perform validation if needed
    if (!name || !email) {
      alert("Name and Email are required fields.");
      return;
    }

    // Show loading indicator
    setIsLoading(true);

    // Prepare the data to send to the server as JSON
    const data = {
      name: name,
      email: email,
      id: route.params.id,
    };

    // Send a POST request to the API with JSON data
    fetch("http://mgt2.pnu.ac.th/dbreactnative/update_profile.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          // Handle success (e.g., display a success message)
          alert("Profile updated successfully.");
          // Navigate back to the profile screen
          navigation.goBack();
        } else {
          // Handle error (e.g., display an error message)
          alert("Failed to update profile.");
        }
      })
      .catch((error) => {
        // Handle network error
        console.log(error);
        console.error("Error:", error);
      })
      .finally(() => {
        // Hide loading indicator
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Profile:{id}</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.loginBtn}>
        <TouchableOpacity onPress={handleUpdateProfile} disabled={isLoading}>
          <MaterialIcons name="update" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.text}>Update</Text>
      </View>
      {isLoading && <ActivityIndicator size="large" color="blue" />}
    </View>
  );
};

export default UpdateProfile;
