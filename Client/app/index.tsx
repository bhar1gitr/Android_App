import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ImageBackground, 
  Dimensions 
} from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser } from '../services/authService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../services/AuthContext';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [voterId, setVoterId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();
const handleLogin = async () => {
  try {
    const data = await loginUser(voterId, password);
    // Use the context login to save token AND update state globally
    await login(data.token); 
    router.replace('/(tabs)'); 
  } catch (err) {
    Alert.alert("Error", "Login failed");
  }
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ff6600' }} edges={['top']}>
    <View style={styles.container}>
      {/* Top Banner Area based on screenshot */}
      <View style={styles.headerBanner}>
        <Text style={styles.bannerText}>ठाणे महानगरपालिका</Text>
      </View>

      <View style={styles.content}>
        {/* Logo Icon Area */}
        <View style={styles.logoContainer}>
           <View style={styles.circleLogo}>
              <Text style={styles.logoText}>V</Text>
           </View>
        </View>

        <Text style={styles.title}>Voter Portal</Text>
        <Text style={styles.subtitle}>Secure Election Access</Text>
        
        {/* Card-style Input Container */}
        <View style={styles.card}>
          <TextInput 
            style={styles.input}
            placeholder="Voter ID"
            placeholderTextColor="#999"
            value={voterId}
            onChangeText={setVoterId}
            autoCapitalize="none"
          />

          <TextInput 
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Verify & Sign In</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.registerText}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  headerBanner: {
    backgroundColor: '#ff6600', // Primary orange from image
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  bannerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  circleLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ff6600',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoText: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 12, 
    borderRadius: 5, 
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  button: { 
    backgroundColor: '#ff6600', 
    padding: 15, 
    borderRadius: 5, 
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  registerText: {
    marginTop: 20,
    color: '#005fa3', // Blue link color from image
    textDecorationLine: 'underline',
    fontWeight: '500'
  }
});