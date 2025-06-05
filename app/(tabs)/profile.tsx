// Profile.tsx
// Kullanıcı login/register, profil bilgileri ve favori filmlerini gösterir.

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { auth, db} from "@/firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getFavs } from "@/services/user"; // Appwrite fonksiyonu

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [favorites, setFavorites] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);

  // Kullanıcı ve profil bilgilerini çek
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setFetching(true);
        try {
          // Firestore'dan profil bilgisi çek
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          setProfile(userDoc.exists() ? userDoc.data() : null);

          // Appwrite'dan favorileri çek
          const favs = await getFavs(currentUser.uid);
          setFavorites(favs);
        } catch (e) {
          setProfile(null);
          setFavorites([]);
        }
        setFetching(false);
      } else {
        setProfile(null);
        setFavorites([]);
      }
    });
    return unsubscribe;
  }, []);

  // Giriş yap
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      setError(e.message || "Giriş başarısız");
    } finally {
      setLoading(false);
    }
  };

  // Kayıt ol
  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;
      // Firestore'a profil bilgisi ekle
      await setDoc(doc(db, "users", newUser.uid), {
        name: registerName,
        email: newUser.email,
        avatar: defaultAvatar,
      });
      setShowRegister(false);
      setEmail("");
      setPassword("");
      setRegisterName("");
      Alert.alert("Başarılı", "Kayıt başarılı! Giriş yapabilirsiniz.");
    } catch (e: any) {
      setError(e.message || "Kayıt başarısız");
    } finally {
      setLoading(false);
    }
  };

  // Çıkış yap
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch((error) => Alert.alert("Çıkış yapılamadı", error.message));
  };

  // Login/Register ekranı
  if (!user) {
    return (
      <View className="flex-1 bg-white justify-center px-6">
        <View className="items-center mb-8">
          <Image
            source={{ uri: defaultAvatar }}
            style={{ width: 90, height: 90, marginBottom: 16 }}
          />
          <Text className="text-2xl font-bold mb-1 text-center">
            Hoş Geldiniz
          </Text>
          <Text className="text-gray-500 mb-6 text-center">
            Hesabınıza giriş yapın
          </Text>
        </View>
        {showRegister ? (
          <>
            <Text className="text-gray-700 mb-2">Ad</Text>
            <View className="flex-row items-center bg-gray-100 rounded-lg px-3 mb-4">
              <TextInput
                className="flex-1 py-3 text-base"
                placeholder="Adınız"
                placeholderTextColor="#A0AEC0"
                value={registerName}
                onChangeText={setRegisterName}
              />
            </View>
            <Text className="text-gray-700 mb-2">E-posta</Text>
            <View className="flex-row items-center bg-gray-100 rounded-lg px-3 mb-4">
              <TextInput
                className="flex-1 py-3 text-base"
                placeholder="ornek@email.com"
                placeholderTextColor="#A0AEC0"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <Text className="text-gray-700 mb-2">Şifre</Text>
            <View className="flex-row items-center bg-gray-100 rounded-lg px-3 mb-4">
              <TextInput
                className="flex-1 py-3 text-base"
                placeholder="********"
                placeholderTextColor="#A0AEC0"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            {error ? (
              <Text className="text-red-500 mb-2 text-center">{error}</Text>
            ) : null}
            <TouchableOpacity
              className="bg-blue-600 rounded-lg py-3 mt-2 mb-3"
              onPress={handleRegister}
              disabled={loading}
            >
              <Text className="text-white text-center text-base font-semibold">
                Kayıt Ol
              </Text>
            </TouchableOpacity>
            <View className="flex-row justify-center mt-2">
              <Text className="text-gray-600">Zaten hesabınız var mı? </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowRegister(false);
                  setError("");
                }}
              >
                <Text className="text-blue-600 font-semibold">Giriş Yap</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text className="text-gray-700 mb-2">E-posta</Text>
            <View className="flex-row items-center bg-gray-100 rounded-lg px-3 mb-4">
              <TextInput
                className="flex-1 py-3 text-base"
                placeholder="ornek@email.com"
                placeholderTextColor="#A0AEC0"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <Text className="text-gray-700 mb-2">Şifre</Text>
            <View className="flex-row items-center bg-gray-100 rounded-lg px-3 mb-4">
              <TextInput
                className="flex-1 py-3 text-base"
                placeholder="********"
                placeholderTextColor="#A0AEC0"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            {error ? (
              <Text className="text-red-500 mb-2 text-center">{error}</Text>
            ) : null}
            <TouchableOpacity
              className="bg-blue-600 rounded-lg py-3 mt-2 mb-3"
              onPress={handleLogin}
              disabled={loading}
            >
              <Text className="text-white text-center text-base font-semibold">
                Giriş Yap
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-blue-600 text-center mb-4">
                Şifremi Unuttum
              </Text>
            </TouchableOpacity>
            <View className="flex-row justify-center mt-2">
              <Text className="text-gray-600">Hesabınız yok mu? </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowRegister(true);
                  setError("");
                }}
              >
                <Text className="text-blue-600 font-semibold">Kayıt Ol</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }

  // Profil ekranı
  if (fetching) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-0">
      <View className="items-center mt-10 mb-6">
        <Image
          source={{ uri: profile?.avatar || defaultAvatar }}
          style={{ width: 110, height: 110, borderRadius: 55, marginBottom: 10 }}
        />
        <Text className="text-xl font-bold text-center">
          {profile?.name || "Kullanıcı Adı"}
        </Text>
        <Text className="text-gray-500 text-base mb-1">{user.email}</Text>
      </View>
      <View className="bg-gray-50 rounded-2xl mx-4 mb-8">
        <TouchableOpacity className="flex-row items-center px-6 py-4 border-b border-gray-200">
          <Text className="text-lg ml-2">Kişisel Bilgiler</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center px-6 py-4 border-b border-gray-200">
          <Text className="text-lg ml-2">Şifre Değiştir</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center px-6 py-4 border-b border-gray-200">
          <Text className="text-lg ml-2">Bildirim Ayarları</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center px-6 py-4 border-b border-gray-200">
          <Text className="text-lg ml-2">Dil Seçenekleri</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center px-6 py-4">
          <Text className="text-lg ml-2">Gizlilik Ayarları</Text>
        </TouchableOpacity>
      </View>
      {/* Favori filmler bölümü */}
      <View className="mx-4 mb-8">
        <Text className="text-lg font-bold mb-2">Beğenilen Filmler</Text>
        {favorites.length === 0 ? (
          <Text className="text-gray-400">Henüz beğenilen film yok.</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {favorites.map((movie) => (
              <View key={movie.$id} className="mr-4 w-32">
                <Image
                  source={{ uri: movie.poster_url }}
                  className="w-32 h-44 rounded-lg mb-2"
                />
                <Text className="font-semibold text-sm">{movie.title}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      <TouchableOpacity
        className="bg-red-600 rounded-lg py-4 mx-4 mb-10 flex-row items-center justify-center"
        onPress={handleLogout}
      >
        <Text className="text-white text-lg font-semibold">Çıkış Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
