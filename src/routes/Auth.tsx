import { createStackNavigator } from '@react-navigation/stack';
import { THEME } from '../config/theme';
import { LetsIn, CreateAccount, Login, ForgotPassword, CodeSent, CreatePassword } from '../screens/Auth';

import { AuthNavigationParams } from '../types/navigation';

const { Navigator, Screen } = createStackNavigator<AuthNavigationParams>();

const AuthRoutes = () => {
    const { colors } = THEME;
    return (
        <Navigator screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: colors.white
            }
        }}>
            <Screen name='Lets In' component={LetsIn} />
            <Screen name='Create Account' component={CreateAccount} />
            <Screen name='Login' component={Login} />
            <Screen name='Forgot Password' component={ForgotPassword} />
            <Screen name='Code Sent' component={CodeSent} />
            <Screen name='Create Password' component={CreatePassword} />
        </Navigator>
    );
}

export default AuthRoutes;