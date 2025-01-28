import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, TouchableOpacity, StyleSheet, TextInput, TouchableWithoutFeedback, FlatList, ScrollView, VirtualizedList, Keyboard } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/app/redux/store/store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUser, setIsActive, setIsLogoutMenuOpen } from '@/app/redux/slices/statusSlice';
import { router } from 'expo-router';
import { Badge, Text } from '@rneui/base';
import { Avatar } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateAmountTotal } from '@/app/redux/slices/shopSlice';
import statusBarHeight from '@/app/commons/commons';
import Menu from '@/app/components/Menu/Menu';
import { Store } from '@/app/types/types';

function NavBar() {
  const dispatch = useAppDispatch();
  const [isOpenMenu, setIsOpenMenu] = useState<Boolean>(false);
  const [resultSearch, setResultSearch] = useState<Array<Store>>()
  const [search, setSearch] = useState('');
  const { amountTotal } = useAppSelector(state => state.shop);
  const { isThereUser } = useAppSelector(state => state.status);
  const { isActive, isLogoutMenuOpen } = useAppSelector(state => state.status);
  const { products } = useAppSelector(state => state.products)
  const searchRef = useRef<TextInput>(null);
  const getItem = (data: Store[], index: number) => data[index];
  const getItemCount = (data: Store[]) => data.length;

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
    router.navigate('/');
  };

  const handleOutsidePress = () => {
    dispatch(setIsLogoutMenuOpen(false));
    dispatch(setIsActive(false));
    Keyboard.dismiss();
  };
  const handleSearch = () => {
    dispatch(setIsActive(true))
  }

  useEffect(() => {
    dispatch(getUser());
    dispatch(calculateAmountTotal())
  }, [dispatch]);

  useEffect(() => {
    if (isActive) {
      if (search !== "") {
        const searchResult: Store[] = products.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
        setResultSearch(searchResult);
      } else {
        setResultSearch([]);
      }
    }
  }, [isActive, products, search]);

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
            <TouchableOpacity onPress={() => router.navigate('/components/Favorites/Favorites')}>
              <Icon name='favorite' size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate('/components/Basket/Basket')}>
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
                <TouchableOpacity style={styles.buttonContainer} onPress={() => router.navigate('/components/SignUp/SignUp')} >
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
          {isOpenMenu && <Menu setIsOpenMenu={setIsOpenMenu} />}
        </View>
        {resultSearch && isActive && search && (
          <VirtualizedList
            data={resultSearch}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.navigate({
                  pathname: "/components/ProductCardDetail/ProductCardDetail",
                  params: { id: item.id }
                })}
              >
                <View style={styles.itemContainer}>
                  <Text style={styles.itemText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
            getItem={getItem}
            getItemCount={getItemCount}
            style={styles.list}
            contentContainerStyle={styles.listContent}
          />
        )}
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
    right: 0,
    zIndex: 99,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    gap: 10,
    boxShadow: '4px 4px 5px rgba(0, 0, 0, 0.05)',
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