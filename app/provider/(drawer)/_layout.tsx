import { createDrawerNavigator } from '@react-navigation/drawer';
import Info_Personal from '../../../components/Info_Personal/Info_Personal';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import languages from './languages'; 
import Entypo from '@expo/vector-icons/Entypo';
import qr from './qr'; 
import shoppingList from '../../shopping'; 

const Drawer = createDrawerNavigator();

const _layout = () => {
  return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="Languages"
          component={languages}
          options={{
            drawerLabel: 'Languages',
            header: () => <Info_Personal />,
            drawerIcon: () => <AntDesign name="codesquare" size={24} color="purple" />,
          }}
        />
        <Drawer.Screen
          name="Qr"
          component={qr}
          options={{
            drawerLabel: 'QR',
            header: () => <Info_Personal />,
            drawerIcon: () => <FontAwesome name="qrcode" size={30} color="purple" />,
          }}
        />
        <Drawer.Screen
          name="Prueba Lista de la compra!"
          component={shoppingList}
          options={{
            headerShown: false,
            drawerIcon: () => <Entypo name="shopping-cart" size={24} color="purple" />,
          }}
        />
      </Drawer.Navigator>
  );
};

export default _layout;
