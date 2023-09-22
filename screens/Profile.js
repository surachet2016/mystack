import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import Logout from "./Logout";
import styles from "../styles";

const Profile = ({ route, navigation }) => {
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    checkToken(); // Check token when the component mounts
    fetchData();
  }, []);

  // Function to check if a token exists in AsyncStorage
  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        // If no token exists, navigate the user to the login screen
        navigation.replace("LoginScreen");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = () => {
    // Fetch your data here and update the 'data' state
    fetch(
      "http://mgt2.pnu.ac.th/dbreactnative/profile.php?email=" +
        route.params.Email
    )
      .then((response) => response.json())
      .then((json) => setUser(json))
      .catch((error) => console.error(error));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData(); // Fetch new data
    setRefreshing(false);
  };

  // Create an array of data to render
  const profileData = [
    { key: "1", label: "ID:", value: user.id || "N/A" },
    { key: "2", label: "ชื่อ:", value: user.name || "N/A" },
    { key: "3", label: "อีเมล:", value: route.params.Email || "N/A" },
    { key: "4", label: "วันที่สมัคร:", value: user.date || "N/A" },
    { key: "5", label: "status:", value: user.status || "N/A" },
  ];

  // Render each item using a FlatList
  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingBottom: 5,
      }}
    >
      <Text style={{ fontSize: 20 }}>{item.label}</Text>
      <Text style={{ fontSize: 20 }}>{item.value}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}>
      <FlatList
        data={profileData}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("UpdateProfile", {
              name: user.name,
              Email: route.params.Email,
              id: user.id,
            })
          }
        >
          <AntDesign name="edit" size={24} color="white" />
          <Text style={styles.buttonText}>แก้ไข</Text>
        </TouchableOpacity>
        <Logout />
      </View>
    </View>
  );
};

export default Profile;
