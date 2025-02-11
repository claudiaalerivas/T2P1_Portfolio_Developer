import { createDrawerNavigator } from '@react-navigation/drawer';
import Info_Personal from '../../components/Info_Personal/Info_Personal';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import qr from './profile/qr';
import shoppingList from './shopping/index';
import HomePage from './home';
import Foundation from '@expo/vector-icons/Foundation';
import LanguagesList from './profile/languages';
import Log_Out from '../../components/LogOut/Log_Out';
import pictures from './pictures';

const Drawer = createDrawerNavigator();

const _layout = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomePage}
        options={{
          drawerLabel: 'Home',
          headerShown: false,
          drawerIcon: () => <Foundation name="home" size={24} color="purple" />,
        }}
      />
      <Drawer.Screen
        name="Languages"
        component={LanguagesList}
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
      <Drawer.Screen
        name="Camara"
        component={pictures}
        options={{
          headerShown: false,
          drawerIcon: () => <Entypo name="camera" size={24} color="purple" />,
        }}
      />
      <Drawer.Screen
        name="Cierre de Sesión"
        component={Log_Out}
        options={{
          headerShown: false
        }}
      />
    </Drawer.Navigator>
  );
};

export default _layout;
