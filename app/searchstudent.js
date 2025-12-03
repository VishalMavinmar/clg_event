import { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SearchStudent() {
  const [token, setToken] = useState("");
  const [student, setStudent] = useState(null);

  const handleSearch = async () => {
    if (!token) {
      Alert.alert("Please enter a token number");
      return;
    }

    try {
      const response = await fetch(`http://10.116.210.42:8000/api/students/${token}/`);
      if (response.ok) {
        const data = await response.json();
        setStudent(data);
      } else {
        Alert.alert("Student not found!");
        setStudent(null);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Network error. Make sure your device is on the same network.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center", paddingVertical: 40 }}>
      <Text style={styles.title}>Find Student by Token</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Token Number"
        placeholderTextColor="#a1a1a1"
        value={token}
        onChangeText={setToken}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {student && (
        <View style={styles.result}>
          <Text style={styles.label}>Name: <Text style={styles.value}>{student.name}</Text></Text>
          <Text style={styles.label}>Class: <Text style={styles.value}>{student.student_class}</Text></Text>
          <Text style={styles.label}>Number: <Text style={styles.value}>{student.number}</Text></Text>

          <Image
            source={{
              uri: student.image
                ? student.image
                : "https://via.placeholder.com/200",
            }}
            style={styles.image}
            onError={() => console.log("Failed to load image:", student.image)}
          />
        </View>
      )}
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
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    width: "90%",
    backgroundColor: "#f1f3f5",
    padding: 18,
    borderRadius: 15,
    marginBottom: 20,
    fontSize: 16,
    color: "#111827",
  },
  searchButton: {
    backgroundColor: "#6366f1",
    paddingVertical: 16,
    borderRadius: 15,
    marginBottom: 25,
    width: "90%",
    alignItems: "center",
    shadowColor: "#6366f1",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 15,
    elevation: 7,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  result: {
    width: "90%",
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 10,
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 4,
    color: "#374151",
  },
  value: {
    fontWeight: "400",
    color: "#111827",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginTop: 20,
  },
});
