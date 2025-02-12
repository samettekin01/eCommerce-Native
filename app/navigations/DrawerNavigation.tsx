import { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Menu from "../components/Menu/Menu";
import CategoryProducts from "../components/CategoryProducts/CategoryProducts";
import { getCategories } from "../redux/slices/categoriesSlice";
import BottomTabNavigation from "./BottomTabNavigation";
import Basket from "../components/Basket/Basket";
import ProductCardDetail from "../components/ProductCardDetail/ProductCardDetail";
import Search from "../components/Search/Search";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Badge } from "@rneui/base";
import { Avatar } from "@rneui/themed";
import SignUp from "../components/SignUp/SignUp";
import { getUser } from "../redux/slices/statusSlice";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {

  const { categories } = useAppSelector(state => state.categories);
  const { userInfo, basket } = useAppSelector(state => state.status);
  const navigation = useNavigation<NavigationProp<any>>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getUser())
  }, [dispatch]);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerRight: () => (
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => navigation.navigate('Root', { screen: 'Search' })}>
              <Icon name="search" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.basketIcon}
              onPress={() => navigation.navigate('Root', { screen: 'Basket' })}>
              <Icon name="shopping-cart" size={30} color="#000" />
              {Array.isArray(basket) && basket.length > 0 && (
                <Badge containerStyle={{ position: 'absolute', top: 0, right: 0 }} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Root', { screen: 'SignUp' })}>
              {userInfo.name !== undefined || "" ?
                <Avatar
                  size={30}
                  rounded
                  source={{ uri: "https://picsum.photos/200/?random=1" }}
                /> : <Icon name="person" size={30} color="#000" />}
            </TouchableOpacity>
          </View>
        ),
        headerTitle: "E-Commerce",
        headerTitleAlign: 'center'
      }}
      drawerContent={props => <Menu {...props} />}
    >
      {categories.map((title, index) =>
        <Drawer.Screen
          key={index}
          name={title}
          component={CategoryProducts}
          initialParams={{ title }}
          options={{
            drawerActiveBackgroundColor: "#f2f2f2",
            drawerActiveTintColor: '#000',
            drawerIcon: () => <Icon name="arrow-right" size={20} />
          }}
        />
      )}
      <Drawer.Screen
        name="MainPage"
        component={BottomTabNavigation}
        options={{
          drawerItemStyle: { display: "none" }
        }}
      />
      <Drawer.Screen
        name="Basket"
        component={Basket}
        options={{
          drawerItemStyle: { display: 'none' }
        }} />
      <Drawer.Screen
        name="ProductDetail"
        component={ProductCardDetail}
        options={{
          drawerItemStyle: { display: 'none' }
        }} />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{
          drawerItemStyle: { display: 'none' }
        }} />
      <Drawer.Screen
        name="SignUp"
        component={SignUp}
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />
    </Drawer.Navigator>
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