import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker"; // Import the image picker
import Logout from "./Logout";
import styles from "../styles";
import { StatusBar } from "expo-status-bar";

const AdminPage = ({ route }) => {
  const { Email, UserId } = route.params;
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const [profilePic, setProfilePic] = useState(
    "http://mgt2.pnu.ac.th/dbreactnative/profile_pics/default.jpg"
  );

  const [error, setError] = useState(null); // State variable for error

  useEffect(() => {
    const checkToken = async () => {
      try {
        setLoading(true);
        const storedToken = await AsyncStorage.getItem("token");
        await loadProfilePicture(UserId);
        if (storedToken) {
          setToken(storedToken);
        } else {
          navigation.replace("LoginScreen");
        }
      } catch (error) {
        console.error("Error checking token:", error);
        Alert.alert("Error", "An error occurred while checking the token.");
      }
    };
    checkToken();
  }, [UserId]);

  const handleLoginPress = () => {
    navigation.navigate("UserList");
  };

  const handleUpdatePicture = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3], // Adjust the aspect ratio as needed
        quality: 1, // Image quality (0 to 1)
      });

      // Handle the selected image, which is available in the assets array
      if (result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        console.log("Selected image:", selectedImage.uri);

        // Create a new FormData object to send the image file
        const formData = new FormData();
        formData.append("UserId", UserId);
        formData.append("avatar", {
          name: "avatar.jpg",
          uri: selectedImage.uri,
          type: "image/jpeg",
        });

        // Send the image to your server for updating the user's profile picture
        const uploadResponse = await fetch(
          `http://mgt2.pnu.ac.th/dbreactnative/updateProfilePics.php?UserId=${UserId}`,
          {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        //console.log(uploadResponse);

        const uploadData = await uploadResponse.json();
        console.log(uploadData);
        if (uploadData.success) {
          // Profile picture updated successfully
          // You may want to reload the profile picture
          await loadProfilePicture(UserId);
        } else {
          //   console.error("Failed to update profile pictureaha");
          //   setError("Failed to update profile pictureaha"); // Set an error message
        }
      }
    } catch (error) {
      console.log(error);
      setError("Failed to update profile picture. Please try again."); // Set an error message
    }
  };

  const loadProfilePicture = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://mgt2.pnu.ac.th/dbreactnative/getProfilePics.php?UserId=${userId}`
      );
      const data = await response.json();
      if (data.success) {
        console.log(data.avatarUrl);
        const imageUrl = `http://mgt2.pnu.ac.th/dbreactnative/profile_pics/${
          data.avatarUrl || "default.jpg"
        }`;
        setProfilePic(imageUrl); // Set the profile picture URL
        setLoading(false);
        setError(null); // Clear any previous error message
        //console.log("Profile Picture URL:", imageUrl); // Log the URL
      }
    } catch (error) {
      //console.error("Error loading profile picture:", error);
      setError("Failed to load profile picture"); // Set an error message
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#ff569f" />

      <TouchableOpacity onPress={handleUpdatePicture}>
        {!loading && (
          <Image
            source={{
              uri: `http://mgt2.pnu.ac.th/dbreactnative/profile_pics/${UserId}_avatar.jpg?t=${new Date().toISOString()}`,
            }}
            style={styles.avatar}
            onError={(e) =>
              console.log("Image load error:", e.nativeEvent.error)
            }
          />
        )}
      </TouchableOpacity>

      <Text style={styles.logo}>AdminPage</Text>
      <Text style={styles.loginText}>สวัสดี: {Email}</Text>
      <Text style={styles.loginText}>ID: {UserId}</Text>

      {/* <TouchableOpacity style={styles.button} onPress={handleUpdatePicture}>
          <Text style={styles.buttonText}>Update Picture</Text>
        </TouchableOpacity> */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>UserList</Text>
      </TouchableOpacity>

      <Logout />
    </View>
  );
};

export default AdminPage;
