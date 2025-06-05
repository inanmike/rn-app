import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";

const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (error) {
      alert("Login failed: " + error);
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
      <Button title="Login" onPress={handleLogin} color="#8B5CF6" /> {/* Buton rengi mor */}
    </View>
  );
};

export default Login;
