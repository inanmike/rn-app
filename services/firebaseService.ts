import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";

// Kullanıcı bilgilerini Firestore'a kaydetme
export const saveUserProfile = async (userId: string, profileData: object) => {
  try {
    await setDoc(doc(firestore, "users", userId), profileData);
  } catch (error) {
    console.error("Error saving user profile:", error);
  }
};

// Kullanıcı profil bilgilerini Firestore'dan alma
export const getUserProfile = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(firestore, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("No user data found");
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    return null;
  }
};
