import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreens from './Components/Screens/LoginScreens';
import CreatePinScreen from './Components/Screens/CreatePinScreen';
import StorePageScreen from './Components/Screens/StorePageScreen';
import SuccessLoginScreen from './Components/Screens/SuccessLoginScreen';
import HomeScreen from './Components/Screens/HomeScreen';
import OfferScreen from './Components/Screens/OfferScreen';
import QuickPurchase from './Components/Screens/QuickPurchase';
import CartScreen from './Components/Screens/CartScreen';
import DairyProducts from './Components/Screens/DairyProducts';
import BakeryProducts from './Components/Screens/BakeryProducts';
import Biscuits from './Components/Screens/Biscuits';
import Namkeen from './Components/Screens/Namkeen';
import Sweets from './Components/Screens/Sweets';
import ProductDetailsScreen from './Components/Screens/ProductDetailsScreen';
import BuyNowScreen from './Components/Screens/BuyNowScreen';
import PaymentScreen from './Components/Screens/PaymentScreen';
import MilkScreen from './Components/Screens/MilkScreen';
import TupScreen from './Components/Screens/TupScreen';
import MithaiScreen from './Components/Screens/MithaiScreen';
import LassiScreen from './Components/Screens/LassiScreen';
import PaneerScreen from './Components/Screens/PaneerScreen';
import ShrikhandScreen from './Components/Screens/ShrikhandScreen';
import KhavyacheModakScreen from './Components/Screens/KhavyacheModakScreen';
import BreadScreen from './Components/Screens/BreadScreen';
import BanpavScreen from './Components/Screens/BanpavScreen';
import DonutScreen from './Components/Screens/DonutScreen';
import RuskScreen from './Components/Screens/RuskScreen';
import ToastScreen from './Components/Screens/ToastScreen';
import KhariScreen from './Components/Screens/KhariScreen';
import CreamRollScreen from './Components/Screens/CreamRollScreen';
import JamBiscuitScreen from './Components/Screens/JamBiscuitScreen';
import FaraliBiscuitScreen from './Components/Screens/FaraliBiscuitScreen';
import ChocolateBiscuitScreen from './Components/Screens/ChocolateBiscuitScreen';
import CreamBiscuitScreen from './Components/Screens/CreamBiscuitScreen';
import BiscuitDetailScreen from './Components/Screens/BiscuitDetailScreen';
import NankataiScreen from './Components/Screens/NankataiScreen';
import SevScreen from './Components/Screens/SevScreen';
import ChivdaScreen from './Components/Screens/ChivdaScreen';
import BhujiaScreen from './Components/Screens/BhujiaScreen';
import FarsanScreen from './Components/Screens/FarsanScreen';
import MixtureScreen from './Components/Screens/MixtureScreen';
import PastryScreen from './Components/Screens/PastryScreen';
import CupcakeScreen from './Components/Screens/CupcakeScreen';
import ChocolateCakeScreen from './Components/Screens/ChocolateCakeScreen';
import MawaCakeScreen from './Components/Screens/MawaCakeScreen';
import EgglessCakeScreen from './Components/Screens/EgglessCakeScreen';
import {getData} from './Components/utils/storage';
import EnterPinScreen from './Components/Screens/EnterPinScreen';
import InvoiceListScreen from './Components/Screens/InvoiceListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkInitialScreen = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const userPin = await AsyncStorage.getItem('@user_pin');

        console.log('isLoggedIn:', isLoggedIn);
        console.log('userPin:', userPin);

        if (isLoggedIn === 'true') {
          if (userPin && userPin.length > 0) {
            setInitialRoute('EnterPinScreen');
          } else {
            setInitialRoute('CreatePinScreen');
          }
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.error('Error checking initial screen:', error);
        setInitialRoute('Login');
      }
    };

    checkInitialScreen();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#6654BA" />
      </View>
    );
  }

  return (
    <NavigationContainer>
<Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Login"
          component={LoginScreens}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EnterPin"
          component={CreatePinScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StorePage"
          component={StorePageScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SuccessLoginScreen"
          component={SuccessLoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OfferScreen"
          component={OfferScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QuickPurchase"
          component={QuickPurchase}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DairyProducts"
          component={DairyProducts}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BakeryProducts"
          component={BakeryProducts}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Biscuits"
          component={Biscuits}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Namkeen"
          component={Namkeen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Sweets"
          component={Sweets}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BuyNowScreen"
          component={BuyNowScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MilkScreen"
          component={MilkScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TupScreen"
          component={TupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MithaiScreen"
          component={MithaiScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LassiScreen"
          component={LassiScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaneerScreen"
          component={PaneerScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShrikhandScreen"
          component={ShrikhandScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="KhavyacheModakScreen"
          component={KhavyacheModakScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BreadScreen"
          component={BreadScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BanpavScreen"
          component={BanpavScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DonutScreen"
          component={DonutScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RuskScreen"
          component={RuskScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ToastScreen"
          component={ToastScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="KhariScreen"
          component={KhariScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreamRollScreen"
          component={CreamRollScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JamBiscuitScreen"
          component={JamBiscuitScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FaraliBiscuitScreen"
          component={FaraliBiscuitScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChocolateBiscuitScreen"
          component={ChocolateBiscuitScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreamBiscuitScreen"
          component={CreamBiscuitScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BiscuitDetailScreen"
          component={BiscuitDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NankataiScreen"
          component={NankataiScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SevScreen"
          component={SevScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChivdaScreen"
          component={ChivdaScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BhujiaScreen"
          component={BhujiaScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FarsanScreen"
          component={FarsanScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MixtureScreen"
          component={MixtureScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PastryScreen"
          component={PastryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CupcakeScreen"
          component={CupcakeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChocolateCakeScreen"
          component={ChocolateCakeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MawaCakeScreen"
          component={MawaCakeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EgglessCakeScreen"
          component={EgglessCakeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EnterPinScreen"
          component={EnterPinScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="InvoiceListScreen"
          component={InvoiceListScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
