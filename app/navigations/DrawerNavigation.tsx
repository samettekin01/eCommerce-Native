import { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Menu from "../components/Menu/Menu";
import CategoryProducts from "../components/CategoryProducts/CategoryProducts";
import { getCategories } from "../redux/slices/categoriesSlice";
import BottomTabNavigation from "./BottomTabNavigation";
import MainPage from "../components/MainPage/MainPage";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {

  const { categories } = useAppSelector(state => state.categories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <Menu {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigation}
        options={{
          drawerIcon: () => <Icon name="home" size={20} />
        }}
      />
      {categories.map((title, index) =>
        <Drawer.Screen
          key={index}
          name={title}
          component={CategoryProducts}
          initialParams={{ title }}
          options={{
            drawerIcon: () => <Icon name="arrow-right" size={20} />
          }}
        />
      )}
    </Drawer.Navigator>
  );
}
