import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AccountNavigationParams } from '../types/navigation';
import { SvgProps } from 'react-native-svg';
import { Dimensions } from 'react-native';
import { Text, View } from 'native-base';

import { Home, Explore, MyList, Download } from '../screens/Account';
import Profile from './Profile';

import { THEME } from '../config/theme';
import {
  BookmarkFillIcon,
  BookmarkIcon,
  CompassFillIcon,
  CompassIcon,
  DownloadFillIcon,
  DownloadIcon,
  HomeFillIcon,
  HomeIcon,
  UserFillIcon,
  UserIcon,
} from '../assets/svg';

const { Navigator, Screen } = createMaterialTopTabNavigator<AccountNavigationParams>();
const { width } = Dimensions.get('screen');

const AccountRoutes = () => {
  const { colors } = THEME;
  const getLabelFromName = (name: string, focused: boolean) => {
    let Icon: React.FC<SvgProps>;
    switch (name) {
      case 'Home':
        Icon = focused ? HomeFillIcon : HomeIcon;
        break;
      case 'Explore':
        Icon = focused ? CompassFillIcon : CompassIcon;
        break;
      case 'My List':
        Icon = focused ? BookmarkFillIcon : BookmarkIcon;
        break;
      case 'Download':
        Icon = focused ? DownloadFillIcon : DownloadIcon;
        break;
      case 'Profile':
        Icon = focused ? UserFillIcon : UserIcon;
        break;
      default:
        Icon = UserIcon;
        break;
    }
    return (
      <View w={width / 5} justifyContent="center">
        <Icon
          height={24}
          width={width / 5}
          color={focused ? colors.primary[500] : colors.gray[400]}
        />
        <Text
          size={'12'}
          width={width / 5}
          textAlign="center"
          fontFamily={focused ? 'mono' : 'body'}
          color={focused ? 'primary.500' : 'gray.300'}
        >
          {name}
        </Text>
      </View>
    );
  };
  return (
    <Navigator
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        swipeEnabled: false,
        tabBarIndicator: () => null,
        tabBarShowIcon: false,
        tabBarLabel: ({ focused }) => getLabelFromName(route.name, focused),
        tabBarStyle: {
          height: 70,
        },
      })}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Explore" component={Explore} />
      <Screen name="My List" component={MyList} />
      <Screen name="Download" component={Download} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
};

export default AccountRoutes;
