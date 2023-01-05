import { createStackNavigator } from '@react-navigation/stack';
import { THEME } from '../config/theme';

import {
  OptionList,
  Notification,
  Download,
  Security,
  Language,
  PrivacyPolicy,
  HelpCenter,
  EditProfile,
} from '../screens/Profile';

import { ProfileNavigationParams } from '../types/navigation';

const { Navigator, Screen } = createStackNavigator<ProfileNavigationParams>();

const Profile = () => {
  const { colors } = THEME;
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Screen name="Option List" component={OptionList} />
      <Screen name="Edit Profile" component={EditProfile} />
      <Screen name="Notification" component={Notification} />
      <Screen name="Download" component={Download} />
      <Screen name="Security" component={Security} />
      <Screen name="Language" component={Language} />
      <Screen name="Privacy Policy" component={PrivacyPolicy} />
      <Screen name="Help Center" component={HelpCenter} />
    </Navigator>
  );
};

export default Profile;
