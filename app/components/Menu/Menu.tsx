import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

export default function Menu(props: any) {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#fff', zIndex: 1000 }}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}