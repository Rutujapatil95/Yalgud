// screens/LoginScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {storeData} from '../utils/storage';

const {width, height} = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    if (username === 'admin' && password === '1234') {
      await storeData('isLoggedIn', true);
      navigation.replace('EnterPin');
    } else {
      Alert.alert('Invalid Credentials', 'Try admin / 1234 for test');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            <Image
              source={require('../Images/logoto.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.loginTitle}>Log In Your Account</Text>

            <Text style={styles.label}>Username</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              placeholder="Enter username"
              placeholderTextColor="#666"
              autoCapitalize="none"
              returnKeyType="next"
              autoComplete="username"
              keyboardType="default"
              underlineColorAndroid="transparent"
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.passwordInput}
                placeholder="Enter password"
                placeholderTextColor="#666"
                secureTextEntry={secureText}
                autoCapitalize="none"
                returnKeyType="done"
                autoComplete="password"
                keyboardType="default"
                underlineColorAndroid="transparent"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setSecureText(!secureText)}>
                <Image
                  source={
                    secureText
                      ? require('../Images/eyeclose.png')
                      : require('../Images/eyeopen.png')
                  }
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <Text style={styles.forgotText}>Forget Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            <Image
              source={require('../Images/background2.jpg')}
              style={styles.bottomImage}
              resizeMode="cover"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#8CC3E2'},
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.07,
  },
  innerContainer: {alignItems: 'center'},
  logo: {
    width: width * 0.5,
    height: height * 0.2,
    marginBottom: height * 0.04,
    borderRadius: 80,
    marginTop: height * 0.1,
  },
  loginTitle: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: height * 0.03,
  },
  label: {
    fontSize: width * 0.045,
    color: '#000',
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginTop: height * 0.015,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? height * 0.018 : height * 0.014,
    fontSize: width * 0.04,
    marginTop: height * 0.005,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    color: '#000',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: height * 0.005,
    paddingHorizontal: 10,
    elevation: 3,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? height * 0.018 : height * 0.014,
    fontSize: width * 0.04,
    color: '#000', // Fix: make text (or dots) visible
  },
  eyeButton: {paddingHorizontal: 5},
  eyeIcon: {width: 24, height: 24, tintColor: '#666'},
  forgotText: {
    color: '#333',
    fontWeight: '900',
    alignSelf: 'flex-start',
    marginVertical: height * 0.02,
    fontSize: width * 0.037,
    marginRight: width * 0.52,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#6654BA',
    borderRadius: 10,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.2,
    marginTop: height * 0.01,
    marginBottom: height * 0.03,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  bottomImage: {
    width: width,
    height: height * 0.22,
    marginTop: height * 0.05,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default LoginScreen;
