import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from '@rneui/themed';
import store, { useAppDispatch } from './app/redux/store/store';
import { getProducts, getSliderProducts } from './app/redux/slices/productsSlice';
import { getBasket } from './app/redux/slices/statusSlice';
import DrawerNavigator from './app/navigations/DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';

function AppContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getSliderProducts());
    dispatch(getBasket());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default function Index() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ReduxProvider>
  );
}