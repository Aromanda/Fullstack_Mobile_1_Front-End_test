// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { FontAwesome } from '@expo/vector-icons'; // Make sure to install the necessary icon library

// const ordersData = [
//   { id: 1, restaurantName: 'Restaurant A' },
//   { id: 2, restaurantName: 'Restaurant B' },
//   // Add more order data here
// ];

// const OrderHistoryScreen = () => {
//   const renderOrderItem = ({ item }) => (
//     <View style={styles.orderItem}>
//       <Text style={styles.restaurantName}>{item.restaurantName}</Text>
//       <TouchableOpacity style={styles.viewIcon}>
//         <FontAwesome name="eye" size={20} color="blue" />
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Order History</Text>
//       <FlatList
//         data={ordersData}
//         renderItem={renderOrderItem}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   orderItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   restaurantName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   viewIcon: {
//     padding: 5,
//   },
//   // Add additional styles as needed
// });

// export default OrderHistoryScreen;