import { useEffect } from 'react';
import { useAppDispatch } from './redux/store/store';
import { getProducts, getSliderProducts } from './redux/slices/productsSlice';
import DrawerNavigator from './navigations/DrawerNavigation';
import { getBasket } from './redux/slices/statusSlice';

export default function Index() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getSliderProducts());
    dispatch(getBasket());
  }, [dispatch]);

  return (
    <DrawerNavigator />
  );
}