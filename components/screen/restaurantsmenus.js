import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomNavbar from '../../components/shared/header';
import FooterNavbar from '../../components/shared/footer';

const RestaurantsMenus = ({ route }) => {
  const { restaurant_id } = route.params;

  // Add your RestaurantsMenu content here

  return (
    <View style={{ flex: 1 }}>
      <CustomNavbar />
      {/* Your RestaurantsMenu content */}
      <FooterNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RestaurantsMenus;
