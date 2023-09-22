import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles";

const loremIpsum = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id tristique arcu. Nullam scelerisque odio in urna hendrerit venenatis. Suspendisse potenti. Sed gravida enim non quam ultrices, in bibendum libero mattis. Vivamus dignissim quam nec tortor bibendum vehicula. Fusce convallis erat et tortor mattis, vel volutpat elit suscipit. Duis vestibulum, mi a vulputate hendrerit, nulla urna tincidunt ligula, nec suscipit urna libero eget arcu. Proin ac sodales felis. Fusce sit amet sollicitudin arcu. Nulla facilisi. Sed id nisi in risus tincidunt egestas. Aenean id ante nec erat tristique tristique. Phasellus aliquam libero eget augue euismod mattis.
  
  Phasellus eget justo in urna consequat bibendum nec ut libero. Etiam a fringilla massa. Maecenas id purus a felis vulputate lacinia ac ac sapien. Morbi sit amet elit ac est gravida viverra. Nunc ac tincidunt mi. Nulla facilisi. Etiam convallis cursus enim, quis tincidunt leo fringilla non. Praesent non nunc in enim congue condimentum. Vestibulum cursus varius hendrerit.
  
  Integer et enim ac nisi cursus ultrices id id felis. Pellentesque sed ante eget ex venenatis bibendum nec eu odio. Maecenas ac volutpat purus. Nam in scelerisque urna. Nullam vel magna nec nisl vehicula blandit. Integer pharetra, odio eget eleifend vehicula, dolor neque malesuada turpis, a blandit libero lorem eu purus. Praesent congue viverra justo, non tristique ligula elementum non.
  
  Suspendisse potenti. Praesent vel arcu sit amet lectus scelerisque sodales. Etiam laoreet turpis ut lectus auctor congue. Fusce sed libero facilisis, euismod purus sed, dapibus nunc. Nullam hendrerit ipsum ac libero venenatis, quis pharetra nisi auctor. In hac habitasse platea dictumst. Vestibulum sit amet vulputate libero, ut posuere ipsum. Nulla facilisi. Nulla aliquam tellus a purus ullamcorper, non eleifend sapien convallis. Vivamus ac odio eu ante tristique dictum.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id tristique arcu. Nullam scelerisque odio in urna hendrerit venenatis. Suspendisse potenti. Sed gravida enim non quam ultrices, in bibendum libero mattis. Vivamus dignissim quam nec tortor bibendum vehicula. Fusce convallis erat et tortor mattis, vel volutpat elit suscipit. Duis vestibulum, mi a vulputate hendrerit, nulla urna tincidunt ligula, nec suscipit urna libero eget arcu. Proin ac sodales felis. Fusce sit amet sollicitudin arcu. Nulla facilisi. Sed id nisi in risus tincidunt egestas. Aenean id ante nec erat tristique tristique. Phasellus aliquam libero eget augue euismod mattis.
  
  Phasellus eget justo in urna consequat bibendum nec ut libero. Etiam a fringilla massa. Maecenas id purus a felis vulputate lacinia ac ac sapien. Morbi sit amet elit ac est gravida viverra. Nunc ac tincidunt mi. Nulla facilisi. Etiam convallis cursus enim, quis tincidunt leo fringilla non. Praesent non nunc in enim congue condimentum. Vestibulum cursus varius hendrerit.
  
  Integer et enim ac nisi cursus ultrices id id felis. Pellentesque sed ante eget ex venenatis bibendum nec eu odio. Maecenas ac volutpat purus. Nam in scelerisque urna. Nullam vel magna nec nisl vehicula blandit. Integer pharetra, odio eget eleifend vehicula, dolor neque malesuada turpis, a blandit libero lorem eu purus. Praesent congue viverra justo, non tristique ligula elementum non.
  
  Suspendisse potenti. Praesent vel arcu sit amet lectus scelerisque sodales. Etiam laoreet turpis ut lectus auctor congue. Fusce sed libero facilisis, euismod purus sed, dapibus nunc. Nullam hendrerit ipsum ac libero venenatis, quis pharetra nisi auctor. In hac habitasse platea dictumst. Vestibulum sit amet vulputate libero, ut posuere ipsum. Nulla facilisi. Nulla aliquam tellus a purus ullamcorper, non eleifend sapien convallis. Vivamus ac odio eu ante tristique dictum.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id tristique arcu. Nullam scelerisque odio in urna hendrerit venenatis. Suspendisse potenti. Sed gravida enim non quam ultrices, in bibendum libero mattis. Vivamus dignissim quam nec tortor bibendum vehicula. Fusce convallis erat et tortor mattis, vel volutpat elit suscipit. Duis vestibulum, mi a vulputate hendrerit, nulla urna tincidunt ligula, nec suscipit urna libero eget arcu. Proin ac sodales felis. Fusce sit amet sollicitudin arcu. Nulla facilisi. Sed id nisi in risus tincidunt egestas. Aenean id ante nec erat tristique tristique. Phasellus aliquam libero eget augue euismod mattis.
  
  Phasellus eget justo in urna consequat bibendum nec ut libero. Etiam a fringilla massa. Maecenas id purus a felis vulputate lacinia ac ac sapien. Morbi sit amet elit ac est gravida viverra. Nunc ac tincidunt mi. Nulla facilisi. Etiam convallis cursus enim, quis tincidunt leo fringilla non. Praesent non nunc in enim congue condimentum. Vestibulum cursus varius hendrerit.
  
  Integer et enim ac nisi cursus ultrices id id felis. Pellentesque sed ante eget ex venenatis bibendum nec eu odio. Maecenas ac volutpat purus. Nam in scelerisque urna. Nullam vel magna nec nisl vehicula blandit. Integer pharetra, odio eget eleifend vehicula, dolor neque malesuada turpis, a blandit libero lorem eu purus. Praesent congue viverra justo, non tristique ligula elementum non.
  
  Suspendisse potenti. Praesent vel arcu sit amet lectus scelerisque sodales. Etiam laoreet turpis ut lectus auctor congue. Fusce sed libero facilisis, euismod purus sed, dapibus nunc. Nullam hendrerit ipsum ac libero venenatis, quis pharetra nisi auctor. In hac habitasse platea dictumst. Vestibulum sit amet vulputate libero, ut posuere ipsum. Nulla facilisi. Nulla aliquam tellus a purus ullamcorper, non eleifend sapien convallis. Vivamus ac odio eu ante tristique dictum.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id tristique arcu. Nullam scelerisque odio in urna hendrerit venenatis. Suspendisse potenti. Sed gravida enim non quam ultrices, in bibendum libero mattis. Vivamus dignissim quam nec tortor bibendum vehicula. Fusce convallis erat et tortor mattis, vel volutpat elit suscipit. Duis vestibulum, mi a vulputate hendrerit, nulla urna tincidunt ligula, nec suscipit urna libero eget arcu. Proin ac sodales felis. Fusce sit amet sollicitudin arcu. Nulla facilisi. Sed id nisi in risus tincidunt egestas. Aenean id ante nec erat tristique tristique. Phasellus aliquam libero eget augue euismod mattis.
  
  Phasellus eget justo in urna consequat bibendum nec ut libero. Etiam a fringilla massa. Maecenas id purus a felis vulputate lacinia ac ac sapien. Morbi sit amet elit ac est gravida viverra. Nunc ac tincidunt mi. Nulla facilisi. Etiam convallis cursus enim, quis tincidunt leo fringilla non. Praesent non nunc in enim congue condimentum. Vestibulum cursus varius hendrerit.
  
  Integer et enim ac nisi cursus ultrices id id felis. Pellentesque sed ante eget ex venenatis bibendum nec eu odio. Maecenas ac volutpat purus. Nam in scelerisque urna. Nullam vel magna nec nisl vehicula blandit. Integer pharetra, odio eget eleifend vehicula, dolor neque malesuada turpis, a blandit libero lorem eu purus. Praesent congue viverra justo, non tristique ligula elementum non.
  
  Suspendisse potenti. Praesent vel arcu sit amet lectus scelerisque sodales. Etiam laoreet turpis ut lectus auctor congue. Fusce sed libero facilisis, euismod purus sed, dapibus nunc. Nullam hendrerit ipsum ac libero venenatis, quis pharetra nisi auctor. In hac habitasse platea dictumst. Vestibulum sit amet vulputate libero, ut posuere ipsum. Nulla facilisi. Nulla aliquam tellus a purus ullamcorper, non eleifend sapien convallis. Vivamus ac odio eu ante tristique dictum.
  
  `;

const UserPage = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const { Email, UserId } = route.params;
  const navigation = useNavigation();
  const [token, setToken] = useState("");
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

  console.log(Email);
  useEffect(() => {
    // Check if the user is authenticated by verifying the token
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        if (storedToken) {
          // Token exists, user is authenticated
          setToken(storedToken);
        } else {
          // Token doesn't exist, user is not authenticated
          //Alert.alert("Authentication Failed", "Please login again.");
          navigation.replace("LoginScreen"); // Navigate to the login screen
        }
      } catch (error) {
        console.error("Error checking token:", error);
        Alert.alert("Error", "An error occurred while checking the token.");
      }
    };

    checkToken();
  }, []);

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

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>UserPage:{UserId}</Text>
      <Text style={styles.loginText}>Email: {Email}</Text>
      <TouchableOpacity onPress={handleUpdatePicture}>
        {(!loading) ?  (
          <Image
            source={{
              uri: `http://mgt2.pnu.ac.th/dbreactnative/profile_pics/${UserId}_avatar.jpg?t=${new Date().toISOString()}`,
            }}
            style={styles.avatar}
            onError={(e) =>
              console.log("Image load error:", e.nativeEvent.error)
            }
          />
          
        ):( <Image
          source={{
            uri: `http://mgt2.pnu.ac.th/dbreactnative/profile_pics/default.jpg`,
          }}
          style={styles.avatar}
          onError={(e) =>
            console.log("Image load error:", e.nativeEvent.error)
          }
        />)
        }
        {/* <Text style={styles.loginText}>Tab to New Avatar</Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate("Profile", { Email: Email })}
      >
        <Text style={styles.loginText}>Profile</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.loginText}>{loremIpsum}</Text>
        {/* Add any additional content you want to display when logged in */}
      </ScrollView>
    </View>
  );
};

export default UserPage;
