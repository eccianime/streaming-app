import { createStackNavigator } from '@react-navigation/stack';
import { THEME } from '../config/theme';

import { Details, CommentList, Player } from '../screens/Movie'

import { MovieNavigationParams } from '../types/navigation';

const { Navigator, Screen } = createStackNavigator<MovieNavigationParams>();

const AppRoutes = () => {
    const { colors } = THEME;
    return (
        <Navigator screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: colors.white
            }
        }}>
            <Screen name='Details' component={Details} />
            <Screen name='Comment List' component={CommentList} />
            <Screen name='Player' component={Player} />
        </Navigator>
    );
}

export default AppRoutes;