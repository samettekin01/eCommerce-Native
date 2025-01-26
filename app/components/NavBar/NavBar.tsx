import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, TouchableOpacity, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/app/redux/store/store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUser, setIsActive, setIsLogoutMenuOpen } from '@/app/redux/slices/statusSlice';
import { router } from 'expo-router';
import { Button } from '@rneui/base';
import { Avatar } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import statusBarHeight from '@/app/commons/commons';
import Menu from '@/app/components/Menu/Menu';

function NavBar() {
  const dispatch = useAppDispatch();
  const [isOpenMenu, setIsOpenMenu] = useState<Boolean>(false);
  const [search, setSearch] = useState('');
  const { isThereUser } = useAppSelector(state => state.status);
  const { isActive, isLogoutMenuOpen } = useAppSelector(state => state.status);
  const searchRef = useRef<TextInput>(null);

  const handleMenu = () => {
    setIsOpenMenu(true);
  };

  const handlePerson = () => {
    if (isThereUser.name !== undefined) {
      dispatch(setIsLogoutMenuOpen(!isLogoutMenuOpen));
    } else {
      router.navigate('/components/SignUp/SignUp');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.setItem('user', '');
    dispatch(setIsLogoutMenuOpen(false));
    dispatch(getUser());
  };

  const handleOutsidePress = () => {
    dispatch(setIsLogoutMenuOpen(false));
    dispatch(setIsActive(false));
  };
  const handleSearch = () => {
    dispatch(setIsActive(true))
  }

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (isActive) {
      let searchTime = setTimeout(() => searchRef.current?.focus(), 0)
      return () => clearTimeout(searchTime)
    }
  }, [isActive]);

  return (
    <>
      {(isLogoutMenuOpen || isActive) && (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <View style={styles.root}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleMenu}>
            <Icon name="menu" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.navigate('/')}>
            <Icon name="token" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSearch}>
            <Icon name="search" size={30} color="#000" />
          </TouchableOpacity>
          <View style={[styles.searchBar, { display: isActive ? 'flex' : 'none' }]}>
            <TextInput
              style={styles.searchInput}
              ref={searchRef}
              placeholder="Search"
              value={search}
              onChangeText={setSearch}
              autoFocus={isActive}
              focusable={isActive}
            />
          </View>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 'auto',
            gap: 20,
          }}>
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
                <Button onPress={handleLogout}>
                  Logout
                </Button>
              </View>
            )}
            <TouchableOpacity onPress={() => router.navigate('/components/Favorites/Favorites')}>
              <Icon name='favorite' size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate('/components/Basket/Basket')}>
              <Icon name="shopping-cart" size={30} color="#000" />
            </TouchableOpacity>
          </View>
          {isOpenMenu && <Menu setIsOpenMenu={setIsOpenMenu} />}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    zIndex: 998,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: (statusBarHeight() || 0),
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
    right: 60,
    zIndex: 99,
  },
  searchBar: {
    position: 'absolute',
    backgroundColor: '#fff',
    zIndex: 99,
    top: 8,
    left: Dimensions.get('window').width / 2 - 100,
  },
  searchInput: {
    width: 200,
    fontSize: 18,
  },
});

export default NavBar;