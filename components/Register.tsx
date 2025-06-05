// Register.tsx
import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const Register = ({ onRegisterSuccess }: { onRegisterSuccess: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore'a sadece email bilgisi ekleniyor
      await setDoc(doc(db, "users", user.uid), {
        email: user.email, // Başlangıçta sadece email bilgisi
      });

      onRegisterSuccess(); // Kullanıcı kaydı başarılı olduğunda işlemi tamamla
    } catch (error) {
      alert("Registration failed: " + error);
    }
  };

  return (
    <View className="flex-1 p-5">
      <TextInput
        className="p-2 my-3 border-2 border-white rounded-md focus:border-purple-600"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="white"
        style={{ color: 'white', width:250, height:50}}
      />
      <TextInput
        className="p-2 my-3 border-2 border-white rounded-md focus:border-purple-600"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="white"
        style={{ color: 'white', width:250, height:50}}
      />
      <Button title="Register" onPress={handleRegister} color="#8B5CF6" />
    </View>
  );
};

export default Register;
