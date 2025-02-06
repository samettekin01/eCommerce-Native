import { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppDispatch } from './redux/store/store';
import { getProducts, getSliderProducts } from './redux/slices/productsSlice';
import BottomTabNavigation from './navigations/BottomTabNavigation';
import DrawerNavigator from './navigations/DrawerNavigation';

const Stack = createStackNavigator();

export default function Index() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getSliderProducts());
  }, [dispatch]);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Root"
    >
      <Stack.Screen name="Root" component={DrawerNavigator} />
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
    </Stack.Navigator>
  );
}