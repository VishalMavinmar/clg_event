import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Linking } from "react-native";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [image, setImage] = useState(null);

  const crId = 1;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

 const handleSubmit = async () => {
  if (!name || !number || !studentClass || !image) {
    Alert.alert("Error", "Please fill all fields and upload an image.");
    return;
  }

  let formattedNumber = number;
  if (!number.startsWith("+")) {
    formattedNumber = "+91" + number;
  }

  const formData = new FormData();
  formData.append("cr", crId);
  formData.append("name", name);
  formData.append("number", formattedNumber);
  formData.append("student_class", studentClass);
  formData.append("image", { 
    uri: image,
    name: "student.jpg",
    type: "image/jpeg",
  });

  try {
    const response = await fetch("http://10.116.210.42:8000/api/students/", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {

      Alert.alert("Success", `Student ${name} registered successfully!`);

      const message = `🎓 Hey ${name}, 
    You are successfully registered for the Event! 🎉
    Your Token Number is ${data.token_number}.`;

      const whatsappURL = `whatsapp://send?phone=${formattedNumber}&text=${encodeURIComponent(message)}`;

      const supported = await Linking.canOpenURL(whatsappURL);

      if (supported) {
        await Linking.openURL(whatsappURL);
      } else {
        Alert.alert("Error", "WhatsApp is not installed on this device.");
      }

      setName("");
      setNumber("");
      setStudentClass("");
      setImage(null);



    } else {
      Alert.alert("Error", JSON.stringify(data));
    }
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Network error!");
  }
};

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Text style={styles.title}>Register Student</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Student Name"
          placeholderTextColor="#a1a1a1"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#a1a1a1"
          value={number}
          keyboardType="numeric"
          onChangeText={setNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Class"
          placeholderTextColor="#a1a1a1"
          value={studentClass}
          onChangeText={setStudentClass}
        />

        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadButtonText}>
            {image ? "Change Image" : "Upload Image"}
          </Text>
        </TouchableOpacity>

        {image && <Image source={{ uri: image }} style={styles.image} />}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate("searchstudent")}
        >
          <Text style={styles.searchButtonText}>Search Student by Token</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    paddingVertical: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
    textAlign: "center",
  },

  card: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 15,
    elevation: 8,
    alignItems: "center",
  },

  input: {
    width: "100%",
    backgroundColor: "#f1f3f5",
    padding: 15,
    borderRadius: 14,
    marginBottom: 15,
    fontSize: 15,
    color: "#111827",
  },

  uploadButton: {
    backgroundColor: "#6366f1",
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
    shadowColor: "#6366f1",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 12,
    elevation: 6,
  },
  uploadButtonText: { color: "#fff", fontWeight: "600", fontSize: 15 },

  image: {
    width: 180,
    height: 180,
    borderRadius: 18,
    marginVertical: 4,
  },

  submitButton: {
    backgroundColor: "#14b8a6",
    paddingVertical: 14,
    borderRadius: 18,
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#14b8a6",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
  },
  submitButtonText: { color: "#fff", fontWeight: "700", fontSize: 17 },

  searchButton: {
    backgroundColor: "#fbbf24",
    paddingVertical: 14,
    borderRadius: 18,
    marginTop: 12,
    marginBottom: 3,
    width: "100%",
    alignItems: "center",
    shadowColor: "#fbbf24",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
  },
  searchButtonText: { color: "#111827", fontWeight: "700", fontSize: 15 },
});
