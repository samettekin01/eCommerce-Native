import React, { useEffect } from 'react';
import { View, Dimensions, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/app/redux/store/store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUser, setIsLogoutMenuOpen } from '@/app/redux/slices/statusSlice';
import { useSegments } from 'expo-router';
import { Badge, Text } from '@rneui/base';
import { Avatar } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateAmountTotal } from '@/app/redux/slices/shopSlice';
import StatusBarHeightComponent from '@/app/commons/commons';
import { useNavigation, NavigationProp, DrawerActions } from '@react-navigation/native';


function NavBar() {
  const dispatch = useAppDispatch();
  const { amountTotal } = useAppSelector(state => state.shop);
  const { isThereUser } = useAppSelector(state => state.status);
  const { isLogoutMenuOpen } = useAppSelector(state => state.status);
  const pathname = useSegments();
  const navigation = useNavigation<NavigationProp<any>>();

  const handleMenu = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const handlePerson = () => {
    if (isThereUser.name !== undefined) {
      dispatch(setIsLogoutMenuOpen(!isLogoutMenuOpen));
    } else {
      navigation.navigate('SignUp');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.setItem('user', '');
    dispatch(setIsLogoutMenuOpen(false));
    dispatch(getUser());
    navigation.navigate('Home');
  };

  const handleOutsidePress = () => {
    dispatch(setIsLogoutMenuOpen(false));
  };

  const handleSearch = () => {
    navigation.navigate('Search');
  }

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(calculateAmountTotal());
  }, [dispatch]);

  return (
    <>
      {(isLogoutMenuOpen) && (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <View style={styles.root}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleMenu}>
            <Icon name="menu" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="token" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSearch} style={{ display: pathname[2] === 'Search' ? 'none' : 'flex' }}>
            <Icon name="search" size={30} color="#000" />
          </TouchableOpacity>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 'auto',
            gap: 20,
          }}>
            <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
              <Icon name='favorite' size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Basket')}>
              <Icon name="shopping-cart" size={30} color="#000" />
              {amountTotal > 0 && <Badge value={amountTotal} containerStyle={{ position: 'absolute', top: -4, right: -4 }} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePerson}>
              {isThereUser.name !== undefined ?
                <Avatar
                  size={30}
                  rounded
                  title={isThereUser.name.slice(0, 1).toUpperCase()}
                  containerStyle={{ backgroundColor: '#3d4db7' }}
                /> : <Icon name="person" size={30} color="#000" />}
            </TouchableOpacity>
            {isThereUser.name !== undefined && isLogoutMenuOpen && (
              <View style={styles.logoutMenu}>
                <TouchableOpacity style={styles.buttonContainer} onPress={handlePerson} >
                  <Icon name="edit" size={20} color="#000" />
                  <Text style={styles.button}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={styles.buttonContainer}>
                  <Icon name="logout" size={20} color="#000" />
                  <Text style={styles.button}>Logout</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View >
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: StatusBarHeightComponent() || 10,
    padding: 15,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    gap: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'transparent',
    zIndex: 998,
  },
  logoutMenu: {
    position: 'absolute',
    top: 40,
    right: 0,
    zIndex: 99,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    gap: 10,
    boxShadow: '4px 4px 5px rgba(0, 0, 0, 0.05)',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    borderBottomWidth: 1,
    paddingBottom: 5
  },
  button: {
    textAlign: 'left',
    fontSize: 18
  },
  list: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2 - 355,
    maxHeight: 500,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    padding: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 10,
  },
});

export default NavBar;