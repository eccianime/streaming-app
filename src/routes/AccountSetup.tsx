import { createStackNavigator } from '@react-navigation/stack';
import { THEME } from '../config/theme';

import { ChooseInterest, FillProfile, CreatePIN, SetFingerprint } from '../screens/AccountSetup'

import { AccountSetupNavigationParams } from '../types/navigation';

const { Navigator, Screen } = createStackNavigator<AccountSetupNavigationParams>();

const AppRoutes = () => {
    const { colors } = THEME;
    return (
        <Navigator screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: colors.white
            }
        }}>
            <Screen name='Choose Interest' component={ChooseInterest} />
            <Screen name='Fill Profile' component={FillProfile} />
            <Screen name='Create PIN' component={CreatePIN} />
            <Screen name='Set Fingerprint' component={SetFingerprint} />
        </Navigator>
    );
}

export default AppRoutes;