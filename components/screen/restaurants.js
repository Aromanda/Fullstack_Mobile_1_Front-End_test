import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import CustomNavbar from '../../components/shared/header';
import FooterNavbar from '../../components/shared/footer';
// import RestaurantsMenus from '../../components/screen/restaurantsmenus';

const images = [
  require('../../assets/Images/Restaurants/cuisineGreek.jpg'),
  require('../../assets/Images/Restaurants/cuisineJapanese.jpg'),
  require('../../assets/Images/Restaurants/cuisinePasta.jpg'),
  require('../../assets/Images/Restaurants/cuisinePizza.jpg'),
  require('../../assets/Images/Restaurants/cuisineSoutheast.jpg'),
  require('../../assets/Images/Restaurants/cuisineViet.jpg'),
  require('../../assets/Images/Restaurants/cuisinePizza.jpg'),
  require('../../assets/Images/Restaurants/cuisineSoutheast.jpg'),
];

const Restaurants = () => {
    const navigation = useNavigation();
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
  
    useEffect(() => {
      const url = `${process.env.EXPO_PUBLIC_NGROK_URL}/api/restaurants`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setRestaurants(data);
          setFilteredRestaurants(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching restaurants:', error);
          setLoading(false);
        });
    }, []);
  
    useEffect(() => {
      const filterRestaurants = () => {
        let result = restaurants;
        if (selectedRating) {
          result = result.filter((restaurant) => restaurant.rating === parseInt(selectedRating));
        }
        if (selectedPrice) {
          result = result.filter((restaurant) => restaurant.price_range === parseInt(selectedPrice));
        }
        setFilteredRestaurants(result);
      };
      filterRestaurants();
    }, [selectedRating, selectedPrice, restaurants]);
  
    const navigateToRestaurantsMenus = (restaurant_id) => navigation.navigate('RestaurantsMenus', { restaurant_id });
  
    const renderRestaurant = ({ item, index }) => (
      <TouchableOpacity onPress={() => navigateToRestaurantsMenus(item.id)}>
        <View style={styles.card}>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{item.name} {`(${ '$'.repeat(item.price_range) })`}</Text>
            <Text style={styles.rating}>{'★'.repeat(item.rating)}</Text>
          </View>
          <Image source={images[index % images.length]} style={styles.image} />
        </View>
      </TouchableOpacity>
    );
  
    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <CustomNavbar />
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>NEARBY RESTAURANTS</Text>
              <View style={styles.pickerWrapper}>
              <View style={styles.dropdownContainer}>
                  <Text style={styles.pickerLabel}>Rating:</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={selectedRating}
                      onValueChange={(value) => setSelectedRating(value)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Select" value={null} />
                      <Picker.Item label="★" value="1" />
                      <Picker.Item label="★★" value="2" />
                      <Picker.Item label="★★★" value="3" />
                      <Picker.Item label="★★★★" value="4" />
                      <Picker.Item label="★★★★★" value="5" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.dropdownContainer}>
                  <Text style={styles.pickerLabel}>Price:</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={selectedPrice}
                      onValueChange={(value) => setSelectedPrice(value)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Select" value={null} />
                      <Picker.Item label="$" value="1" />
                      <Picker.Item label="$$" value="2" />
                      <Picker.Item label="$$$" value="3" />
                      <Picker.Item label="$$$$" value="4" />
                      <Picker.Item label="$$$$$" value="5" />
                    </Picker>
                  </View>
                </View>
              </View>
              <Text style={styles.subHeaderText}>RESTAURANTS</Text>
            </View>
            {loading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
              </View>
            ) : (
              <FlatList
                data={filteredRestaurants}
                renderItem={renderRestaurant}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={{ padding: 10 }}
              />
            )}
          <FooterNavbar />
        </View>
      );
    };
    

// StyleSheet for RestaurantsMenu
const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 20;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    width: cardWidth - 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    justifyContent: 'flex-start',
  },
  image: {
    width: cardWidth - 20,
    height: 60,
    marginBottom: 5,
    borderRadius: 4,
  },
  textContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
  },
  rating: {
    color: 'black',
  },
  headerContainer: {
    padding: 15,
  },
  headerText: {
    fontSize: 19, // Reduced from 24
  },
  subHeaderText: {
    fontSize: 20, // Increased from 18
  },
  pickerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  pickerLabel: {
    marginBottom: 5,
    fontSize: 22, // Increased from default
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#DA583B',
    backgroundColor: '#DA583B',
    borderRadius: 10,
  },
  picker: {
    width: 150,
    height: 50,
    color: 'white',
  },
  dropdownContainer: {
    flex: 1,
    flexDirection: 'column', // Stack the dropdown label and picker vertically
    alignItems: 'flex-start', // Align items to the left
    marginBottom: 10, // Add some space between dropdowns
  },
});

export default Restaurants;