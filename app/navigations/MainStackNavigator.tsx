// navigations/MainStackNavigator.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductCardDetail from "../components/ProductCardDetail/ProductCardDetail";
import BottomTabNavigation from "./BottomTabNavigation";
import Basket from "../components/Basket/Basket";
import Search from "../components/Search/Search";
import SignUp from "../components/SignUp/SignUp";

export default function MainStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabNavigation} />
      <Stack.Screen name="ProductDetail" component={ProductCardDetail} />
      <Stack.Screen name="Basket" component={Basket} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}