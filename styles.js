// styles.js

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    justifyContent: "center",
    alignItems: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
    padding: 10,
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginText: {
    color: "white",
    padding: 5,
    margin: 5,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Arrange buttons horizontally with space between
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#fb5b5a",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 10, // Add spacing between buttons
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  scrollView: {
    backgroundColor: "#003f5c",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#003f5c",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  userInfo: {
    flex: 1,
    fontSize: 16,
    color: "#f0f0f0",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
  userIcon: {
    marginLeft: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "#f003f5",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    elevation: 2,
  },
  formLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  formInput: {
    fontSize: 16,
    backgroundColor: "#003f5c",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },

  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },

  addButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },

  addButtonText: {
    color: "white",
    fontSize: 16,
  },

  cancelButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },

  cancelButtonText: {
    color: "white",
    fontSize: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    // backgroundColor: "#00f", // Background color for the scroll view
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 100, // Makes the image circular if it's a square
    marginBottom: 20,
    borderColor: '#afaa',
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
export default styles;
