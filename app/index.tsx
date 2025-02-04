import { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from './redux/store/store';
import { getProducts, getSliderProducts } from './redux/slices/productsSlice';
import BottomTabNavigation from './navigations/BottomTabNavigation';
import DrawerNavigator from './navigations/DrawerNavigation';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions, NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { Badge } from '@rneui/base';

const Stack = createStackNavigator();

export default function Index() {
  const dispatch = useAppDispatch();
  const { amountTotal } = useAppSelector(state => state.shop);
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getSliderProducts());
  }, [dispatch]);

  return (
    <Stack.Navigator screenOptions={{
      headerRight: () => (
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('BottomTab', { screen: 'Search' })}>
            <Icon name="search" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.basketIcon}
            onPress={() => navigation.navigate('BottomTab', { screen: 'Basket' })}>
            <Icon name="shopping-cart" size={30} color="#000" />
            {amountTotal > 0 && <Badge value={amountTotal} containerStyle={{ position: 'absolute', top: -4, right: -4 }} />}
          </TouchableOpacity>
        </View>
      ),
      headerTitle: "E-Commerce",
      headerTitleAlign: 'center',
      headerLeft: () => {
        const canGoBack = navigation.canGoBack();
        return canGoBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} />
          </TouchableOpacity>
        ) :
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name="menu" size={30} color="#000" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
      },
    }}
      initialRouteName="Root">
      <Stack.Screen name="Root" component={DrawerNavigator} />
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerIcons: {
    display: "flex",
    flexDirection: 'row',
    marginRight: 10,
    gap: 10,
  },
  basketIcon: {
    display: 'flex',
    flexDirection: 'row',
  }
});