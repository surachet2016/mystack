import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import styles from "../styles";

const Register = ({ navigation }) => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const isEmailValid = (Email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(Email).toLowerCase());
  };

  const handlePress = () => {
    if (!Name) {
      Alert.alert("กรุณากรอกชื่อ-สกุล!");
    } else if (Name.length < 6) {
      Alert.alert("กรุณากรอกชื่อ-นามสกุลจริง!");
    } else if (!Email) {
      Alert.alert("กรุณากรอกอีเมล!");
    } else if (!isEmailValid(Email)) {
      Alert.alert("รูปแบบอีเมลไม่ถูกต้อง!");
    } else if (!Password) {
      Alert.alert("กรุณากรอกรหัสผ่าน!");
    } else if (Password.length < 6) {
      Alert.alert("กรุณากรอกรหัสผ่าน 6ตัวขึ้นไป!");
    } else {
      fetch("http://mgt2.pnu.ac.th/dbreactnative/register.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: Name,
          email: Email,
          password: Password,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // Showing response message coming from server after inserting records.
          Alert.alert("สมัครสมาชิกเรียบร้อยแล้ว");
          navigation.replace("LoginScreen");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>สมัครสมาชิก</Text>
      <View style={styles.inputView}>
        <TextInput
          // Adding hint in Text Input using Place holder.
          style={styles.inputText}
          placeholder="ชื่อ-สกุล"
          onChangeText={(Name) => setName(Name)}
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          // Adding hint in Text Input using Place holder.
          style={styles.inputText}
          placeholder="อีเมล"
          onChangeText={(Email) => setEmail(Email)}
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          // Adding hint in Text Input using Place holder.
          style={styles.inputText}
          placeholder="รหัสผ่าน"
          onChangeText={(Password) => setPassword(Password)}
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handlePress}>
        <Text style={styles.loginText}>ตกลง</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
