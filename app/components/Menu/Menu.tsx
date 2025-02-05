import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Menu(props: any) {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#fff', zIndex: 1000 }}>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.reset({
          index: 0,
          routes: [{ name: 'Root', params: { screen: 'MainPage' } }],
        })}
        icon={() => <Icon name='home' size={20} />}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}