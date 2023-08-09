import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './components/LoginScreen';
import RestaurantsScreen from './components/RestaurantsScreen';
import OrderHistoryScreen from './components/OrderHistoryScreen'; // Import your OrderHistoryScreen component

const Tab = createBottomTabNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set this based on your login logic

  return (
    <NavigationContainer>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn ? (
        <Tab.Navigator tabBar={(props) => <Footer {...props} />}>
          <Tab.Screen name="Restaurants">
            {() => <RestaurantsScreen isLoggedIn={isLoggedIn} />}
          </Tab.Screen>
          <Tab.Screen name="OrderHistory" component={OrderHistoryScreen} />
          {/* Add more screens as needed */}
        </Tab.Navigator>
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
};

export default App;