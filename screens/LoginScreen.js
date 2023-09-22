import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles";

const LoginScreen = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigation = useNavigation();

  const isEmailValid = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    try {
      if (!Email) {
        Alert.alert("กรุณากรอกอีเมล!");
        return; // Exit the function early if Email is empty
      } else if (!isEmailValid(Email)) {
        Alert.alert("รูปแบบอีเมลไม่ถูกต้อง!");
        return; // Exit the function early if Email is invalid
      } else if (!Password) {
        Alert.alert("กรุณากรอกรหัสผ่าน!");
        return; // Exit the function early if Password is empty
      }

      const response = await fetch(
        "http://mgt2.pnu.ac.th/dbreactnative/login.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
         
            email: Email,
            password: Password,
          }),
        }
      );
       
      const data = await response.json();
    
      const UserId = data.user.id;
 
      console.log(data.user.id);
      if (data.success === 1) {
        // Successful login
        const status = data.user?.status; // Check if user.status exists

        const token = data.token;

        // Save the token and user data in your app's state or AsyncStorage
        // Example using AsyncStorage (you need to import AsyncStorage):
        await AsyncStorage.setItem("token", token);
        //await AsyncStorage.setItem('user', JSON.stringify(user));
        if (data.user) {
          // Store the user data in AsyncStorage
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
        }
        if (status === "users") {
          // Navigate to user page
          //console.log(" Email:", Email);
          navigation.navigate("UserPage", { UserId , Email});
        }  else if (status === "admin") {
          // Navigate to admin page
          navigation.navigate("AdminPage", { UserId,Email });
        } else {
          // Display an error message
          Alert.alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        }
      } else {
        // Handle unsuccessful login here, e.g., display an error message
        Alert.alert("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MyApp</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)} // Renamed the argument to avoid confusion with state variable
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(password) => setPassword(password)} // Renamed the argument to avoid confusion with state variable
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
