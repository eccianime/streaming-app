import { createStackNavigator } from '@react-navigation/stack';
import { THEME } from '../config/theme';

import Onboarding from '../screens/StandAlone/Onboarding';
import Auth from './Auth';
import AccountSetup from './AccountSetup';
import Account from './Account';
import Notifications from '../screens/StandAlone/Notifications';
import Movie from './Movie';

import { AppNavigationParams } from '../types/navigation';

const { Navigator, Screen } = createStackNavigator<AppNavigationParams>();

const AppRoutes = () => {
    const { colors } = THEME;
    return (
        <Navigator screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: colors.white
            }
        }} initialRouteName='Auth'>
            <Screen name='Onboarding' component={Onboarding} />
            <Screen name='Auth' component={Auth} />
            <Screen name='Account Setup' component={AccountSetup} />
            <Screen name='Account' component={Account} />
            <Screen name='Notifications' component={Notifications} />
            <Screen name='Movie' component={Movie} />
        </Navigator>
    );
}

export default AppRoutes;