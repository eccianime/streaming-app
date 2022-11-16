import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AccountNavigationParams } from '../types/navigation';
import { Home, Explore, MyList, Download, Profile } from '../screens/Account'

const { Navigator, Screen } = createMaterialTopTabNavigator<AccountNavigationParams>();

const AccountRoutes = () => {
//   const getIconFromName = ( name: string, focused: boolean ) => {
//     let Icon: React.FC<SvgProps>
//     switch(name){
//       case 'Home': Icon = HomeIcon; break;
//       case 'Lives': Icon = Sensors; break;
//       case 'Notes': Icon = Description; break;
//       case 'Search': Icon = SearchIcon; break;
//       default: Icon = Help; break;
//     }
//     return <Icon height={24} width={24} color={focused ? colors.primaryColor[1100] : colors.textColor[100]} />
//   }
//   const getLabelFromName = (name: string, focused: boolean) => {
    // let label = '';
    // switch(name){
    //   case 'Home': label = 'Início'; break;
    //   case 'Lives': label = 'Ao vivo'; break;
    //   case 'Notes': label = 'Cadernos'; break;
    //   case 'Search': label = 'Pesquisar'; break;
    // }
//     return <TabLabel focused={focused} width={width / 4}>{label}</TabLabel>
//   }
  return (
    <Navigator tabBarPosition='bottom'>
        <Screen name="Home" component={Home} />
        <Screen name="Explore" component={Explore} />
        <Screen name="My List" component={MyList} />
        <Screen name="Download" component={Download} />
        <Screen name="Profile" component={Profile} />
    </Navigator>
  );
}

export default AccountRoutes;