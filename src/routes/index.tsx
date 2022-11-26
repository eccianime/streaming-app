import { NavigationContainer } from '@react-navigation/native'
import GlobalProvider from '../contexts/global'
import AppRoutes from './App'

const Routes = () => {
    return (
        <GlobalProvider>
            <NavigationContainer>
                <AppRoutes />
            </NavigationContainer>
        </GlobalProvider>
    );
}

export default Routes;