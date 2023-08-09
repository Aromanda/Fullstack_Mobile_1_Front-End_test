// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const Header = ({ isLoggedIn, setIsLoggedIn }) => {
//   const handleLogout = () => {
//     // Implement your logout logic here
//     // For example, clear user data from storage and update login state
//     setIsLoggedIn(false);
//   };

//   return (
//     <View style={styles.header}>
//       <Text style={styles.title}>My Restaurant App</Text>
//       {isLoggedIn && (
//         <TouchableOpacity onPress={handleLogout}>
//           <Text style={styles.logout}>Logout</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: '#f2f2f2',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   logout: {
//     color: 'blue',
//   },
// });

// export default Header;