import { getUser, setIsLogoutMenuOpen } from '@/app/redux/slices/statusSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Avatar } from '@rneui/themed';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Menu(props: any) {
  const { userInfo } = useAppSelector(state => state.status);
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    await AsyncStorage.setItem('user', '');
    dispatch(setIsLogoutMenuOpen(false));
    dispatch(getUser());
    props.navigation.navigate('MainPage', { screen: 'Tabs', params: { screen: 'Home' } });
  }

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#fff' }}>
      <View style={[styles.topContainer, { height: userInfo.name ? 180 : 50 }]}>
        <Text style={styles.title}>E-Commerce MobApp</Text>
        {userInfo.name && <View style={styles.userInfo}>
          <Avatar
            size={100}
            rounded
            source={{ uri: "https://picsum.photos/200/?random=1" }}
          />
          <View style={styles.user}>
            <Text style={styles.textName}>{userInfo.name}</Text>
            <Text style={styles.textMail}>{userInfo.mail}</Text>
          </View>
        </View>}
      </View>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('MainPage', { screen: 'Tabs', params: { screen: 'Home' } })}
        activeBackgroundColor='#f2f2f2'
        icon={() => <Icon name='home' size={20} />}
      />
      <DrawerItemList {...props} />
      {userInfo.name && <DrawerItem
        label="Logout"
        onPress={handleLogout}
        icon={() => <Icon name="logout" size={20} color="#000" />}
        activeBackgroundColor='#f2f2f2'
        activeTintColor='#000'
      />}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  topContainer: {

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.3)',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20
  },
  userInfo: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    padding: 10
  },
  user: {
    flex: 1,
    flexDirection: 'column'
  },
  textName: {
    fontSize: 18
  },
  textMail: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)'
  }
})