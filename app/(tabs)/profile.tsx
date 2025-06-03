// Profile.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView } from "react-native";
import { auth, db } from "@/firebaseConfig"; // db importu
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; // Firestore methodları
import Login from "@/components/Login";
import Register from "@/components/Register";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(true); // Başlangıçta Login formunu göster
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [birthdate, setBirthdate] = useState("");

  // Kullanıcı giriş yaptıysa bilgileri Firestore'dan al
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData?.name || "");
          setPhone(userData?.phone || "");
          setCountry(userData?.country || "");
          setBirthdate(userData?.birthdate || "");
        }
      }
    });

    return unsubscribe;
  }, []);

  // Kullanıcı çıkışı
  const handleLogout = () => {
    signOut(auth);
  };

  // Kullanıcı bilgilerini Firestore'a kaydet
  const handleSaveChanges = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);

      // Eğer kullanıcı bilgileri varsa güncelleriz, yoksa yeni belge oluştururuz
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        // Kullanıcı zaten var, bilgileri güncelle
        await updateDoc(userDocRef, {
          name,
          phone,
          country,
          birthdate,
        });
      } else {
        // Yeni kullanıcı, bilgileri kaydet
        await setDoc(userDocRef, {
          name,
          phone,
          country,
          birthdate,
        });
      }
      alert("Profile updated!");
    }
  };

  if (!user) {
    return (
      <View className="bg-black flex-1 p-5 pt-12 justify-center items-center">
        <Text className="text-white mb-5 text-center">Lütfen giriş yapın veya kayıt olun</Text>

        {/* Login/Register Toggle */}
        <View className="flex-row justify-around mb-5">
          <TouchableOpacity
            className={`p-3 rounded-lg ${showLogin ? 'bg-purple-600' : 'bg-gray-700'}`}
            onPress={() => setShowLogin(true)}
          >
            <Text className="text-white">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`p-3 rounded-lg ${!showLogin ? 'bg-purple-600' : 'bg-gray-700'}`}
            onPress={() => setShowLogin(false)}
          >
            <Text className="text-white">Register</Text>
          </TouchableOpacity>
        </View>

        {/* Formlar */}
        {showLogin ? (
          <Login onLoginSuccess={() => setUser(auth.currentUser)} />
        ) : (
          <Register onRegisterSuccess={() => setUser(auth.currentUser)} />
        )}
      </View>
    );
  }

  return (
    <ScrollView className="bg-black flex-1 p-5">
      <Text className="text-white text-xl mb-5">Giriş yapan kullanıcı: {user.email}</Text>

      {/* Kullanıcı bilgilerini düzenlemek için form */}
      <TextInput
        className="p-4 my-3 border-2 border-white rounded-md focus:border-purple-600 text-white"
        placeholder="Ad"
        value={name}
        onChangeText={setName}
        placeholderTextColor="white"
        style={{ fontSize: 16 }}
      />
      <TextInput
        className="p-4 my-3 border-2 border-white rounded-md focus:border-purple-600 text-white"
        placeholder="Telefon"
        value={phone}
        onChangeText={setPhone}
        placeholderTextColor="white"
        style={{ fontSize: 16 }}
      />
      <TextInput
        className="p-4 my-3 border-2 border-white rounded-md focus:border-purple-600 text-white"
        placeholder="Ülke"
        value={country}
        onChangeText={setCountry}
        placeholderTextColor="white"
        style={{ fontSize: 16 }}
      />
      <TextInput
        className="p-4 my-3 border-2 border-white rounded-md focus:border-purple-600 text-white"
        placeholder="Doğum Tarihi"
        value={birthdate}
        onChangeText={setBirthdate}
        placeholderTextColor="white"
        style={{ fontSize: 16 }}
      />

      <Button title="Save Changes" onPress={handleSaveChanges} color="#8B5CF6" />
      <TouchableOpacity onPress={handleLogout}>
        <Text className="text-red-500 mt-3">Çıkış Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;
