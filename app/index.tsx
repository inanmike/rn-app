import { Link } from "expo-router";
import { Button, ScrollView, Text, TextInput, View, Image, StyleSheet } from "react-native";
import Page from "./details";

export default function Index() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput placeholder="Bi'şeyler yaz" />
        <Text>app/index.tsx falan oraya git dosyayı düzenle</Text>
        <Link href={'/details'}>Sayfaya git</Link>
        <Link style={styles.link} href={'/details'}>Sayfya git 2</Link>
        <Button title="Tıkla" onPress={() => {
          alert(`N'aber?`)
        }}/>
        <Image style={{backgroundColor: 'gray'}} source={require('@/assets/images/react-logo.png')}/>
      </View>
    </ScrollView>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    backgroundColor: 'gray',
    fontSize: 20,
  }
})