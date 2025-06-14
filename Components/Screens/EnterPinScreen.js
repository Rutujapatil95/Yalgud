import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getData } from '../utils/storage';

const { width, height } = Dimensions.get('window');

const EnterPINScreen = () => {
  const navigation = useNavigation();
  const [pin, setPin] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return;

    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text !== '' && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && pin[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const checkPin = async () => {
    const enteredPin = pin.join('');
    if (enteredPin.length !== 4) {
      Alert.alert('Error', 'Please enter all 4 digits');
      return;
    }

    const savedPin = await getData('@user_pin');
    if (enteredPin === savedPin) {
      Alert.alert('Success', 'PIN verified! You are logged in.');
      navigation.replace('HomeScreen');
    } else {
      Alert.alert('Error', 'Incorrect PIN');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.inner}>
          <Image
            source={require('../Images/logoto.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Enter your 4-digit PIN</Text>

          <View style={styles.pinContainer}>
            {[0, 1, 2, 3].map(index => (
              <TextInput
                key={index}
                ref={ref => (inputs.current[index] = ref)}
                value={pin[index]}
                onChangeText={text => handleChange(text, index)}
                onKeyPress={e => handleBackspace(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                style={styles.pinBox}
                secureTextEntry
              />
            ))}
          </View>

          {/* Forgot PIN */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.forgotText}>Forgot PIN?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={checkPin}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8CC3E2',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: height * 0.05,
    marginTop: -height * 0.2,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    color: '#333',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.7,
    marginBottom: height * 0.02,
  },
  pinBox: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    fontSize: width * 0.06,
    backgroundColor: '#fff',
    color: '#000',
  },
  forgotText: {
    color: '#000',
    fontSize: width * 0.04,
    marginTop: height * -0.01,
    marginBottom: height * 0.02,
    alignSelf: 'flex-start',
    marginLeft: width * 0.10,
    marginRight: width * 0.50,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#6654BA',
    borderRadius: 10,
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.25,
    marginTop: height * 0.02,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.045,
    textAlign: 'center',
  },
});

export default EnterPINScreen;
