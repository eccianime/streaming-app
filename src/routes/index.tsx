import { NavigationContainer } from '@react-navigation/native';
import GlobalProvider from '../contexts/global';
import AppRoutes from './App';

const Routes = () => {
  return (
    <NavigationContainer>
      <GlobalProvider>
        <AppRoutes />
      </GlobalProvider>
    </NavigationContainer>
  );
};

export default Routes;
