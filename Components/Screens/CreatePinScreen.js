import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const CreatePinScreen = () => {
  // Store real digits here (not masked)
  const [pin, setPin] = useState(['', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '']);
  const navigation = useNavigation();

  // refs for pin inputs and confirm pin inputs
  const pinRefs = useRef([]);
  const confirmPinRefs = useRef([]);

  // Handle submission: validate and save PIN
  const handleSubmit = async () => {
    if (pin.includes('') || confirmPin.includes('')) {
      Alert.alert('Error', 'Please enter all 4 digits!');
      return;
    }
    if (pin.join('') !== confirmPin.join('')) {
      Alert.alert('Error', 'PINs do not match!');
      return;
    }

    try {
      await AsyncStorage.setItem('@user_pin', JSON.stringify(pin.join('')));
      const storedPin = await AsyncStorage.getItem('@user_pin'); // Await here
      console.log('Data Set = ', storedPin);
      Alert.alert(
        'Success',
        'PIN saved successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              setPin(['', '', '', '']);
              setConfirmPin(['', '', '', '']);
              navigation.navigate('SuccessLoginScreen');
            },
          },
        ],
        pin,
      );
    } catch (e) {
      Alert.alert('Error', 'Failed to save PIN');
      console.error('AsyncStorage save error:', e);
    }
  };

  // Render inputs for PIN or confirm PIN
  const renderPinInputs = (values, setValues, refs) => (
    <View style={styles.pinRow}>
      {values.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => (refs.current[index] = ref)}
          style={styles.pinInput}
          maxLength={1}
          keyboardType="number-pad"
          value={digit ? '●' : ''}
          secureTextEntry={false} // we handle masking by showing '●' manually
          onChangeText={text => {
            // Accept only digits or empty string
            if (!/^\d?$/.test(text)) return;

            const newPin = [...values];
            newPin[index] = text;
            setValues(newPin);

            // Move focus forward on digit input
            if (text && index < values.length - 1) {
              refs.current[index + 1]?.focus();
            }
          }}
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              const newPin = [...values];

              if (values[index]) {
                // If current input has a digit, clear it
                newPin[index] = '';
                setValues(newPin);
              } else if (index > 0) {
                // Move back focus and clear previous input
                refs.current[index - 1]?.focus();
                newPin[index - 1] = '';
                setValues(newPin);
              }
            }
          }}
          returnKeyType="done"
          textContentType="oneTimeCode"
          autoFocus={index === 0 && values.every(v => v === '')}
          selectionColor="#6A5ACD"
          importantForAutofill="no"
          caretHidden={true}
        />
      ))}
    </View>
  );

  // Submit button disabled if any digit empty or PINs don't match
  const isSubmitDisabled =
    pin.includes('') ||
    confirmPin.includes('') ||
    pin.join('') !== confirmPin.join('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6A5ACD" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Image
            source={require('../Images/logoto.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Create Your PIN</Text>

          <View style={styles.pinContainer}>
            <Text style={styles.label}>Enter PIN</Text>
            {renderPinInputs(pin, setPin, pinRefs)}

            <Text style={styles.label}>Confirm PIN</Text>
            {renderPinInputs(confirmPin, setConfirmPin, confirmPinRefs)}
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitDisabled && {backgroundColor: '#AAA'},
            ]}
            onPress={handleSubmit}
            disabled={isSubmitDisabled}
            activeOpacity={0.8}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <Image
        source={require('../Images/background2.jpg')}
        style={styles.bottomImage}
        resizeMode="cover"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8CC3E2',
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: height * 0.08,
    paddingBottom: height * 0.1,
    paddingHorizontal: width * 0.07,
  },
  logo: {
    width: width * 0.5,
    height: height * 0.15,
    borderRadius: 100,
    marginBottom: height * 0.03,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: height * 0.025,
  },
  pinContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: width * 0.1,
  },
  label: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#000',
    marginTop: height * 0.025,
    marginBottom: height * 0.015,
    alignSelf: 'flex-start',
  },
  pinRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: height * 0.015,
  },
  pinInput: {
    width: width * 0.12,
    height: width * 0.12,
    backgroundColor: '#fff',
    borderRadius: 4,
    textAlign: 'center',
    fontSize: width * 0.05,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 10,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.25,
    marginTop: height * 0.07,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.2,
    zIndex: -1,
  },
});

export default CreatePinScreen;
