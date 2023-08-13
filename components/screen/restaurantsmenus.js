import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import CustomNavbar from '../../components/shared/header';
import FooterNavbar from '../../components/shared/footer';

const RestaurantsMenus = ({ route }) => {
  const { restaurant_id } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    // Fetch restaurant details
    const url = `${process.env.EXPO_PUBLIC_NGROK_URL}/api/restaurants`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const foundRestaurant = data.find((rest) => rest.id === restaurant_id.id);
        setRestaurant(foundRestaurant);
      })
      .catch((error) => {
        console.error('Error fetching restaurant details:', error);
      });

    // Fetch products for the restaurant
    const productsUrl = `${process.env.EXPO_PUBLIC_NGROK_URL}/api/products?restaurant=${restaurant_id.id}`;
    fetch(productsUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false); // Set loading to false once products are fetched
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, [restaurant_id]);


  return (
    <View style={{ flex: 1 }}>
      <CustomNavbar />
  
      <View style={styles.container}>
        <Text style={styles.headerText}>RESTAURANT MENU</Text>
  
        <View style={styles.restaurantInfo}>
          <View style={styles.restaurantInfoText}>
            {/* <Text style={styles.restaurantName}>{restaurant_id.name}</Text> */}
            <Text style={styles.restaurantName}>{restaurant?.name}</Text>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemLabel}>Price:</Text>
              <Text style={styles.menuItemValue}>{"$".repeat(restaurant?.price_range)}</Text>
            </View>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemLabel}>Rating:</Text>
              <Text style={styles.menuItemValue}>{"★".repeat(restaurant?.rating)}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.createOrderButton}>
            <Text style={styles.createOrderButtonText}>Create Order</Text>
          </TouchableOpacity>
        </View>
        
        {/* Display the list of products here */}
        <FlatList
  data={products}
  renderItem={({ item }) => (
    <View style={styles.productItem}>
      <Image
        source={require('../../assets/Images/RestaurantMenu.jpg')}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
    </View>
  )}
  keyExtractor={(item) => item.id.toString()}
/>
    </View>
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  restaurantInfo: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-between', // Space between items
    alignItems: 'center', // Vertically align items
    width: '100%', // Occupy full width
    paddingHorizontal: 20, // Add some horizontal padding
    marginBottom: 20, // Add some margin
  },
  restaurantInfoText: {
    // Add any additional styles for the restaurant info text container here
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  menuItemLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  menuItemValue: {},
  createOrderContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  createOrderButton: {
    backgroundColor: '#DA583B',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  createOrderButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  ordersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 10,
  },
});

export default RestaurantsMenus;
