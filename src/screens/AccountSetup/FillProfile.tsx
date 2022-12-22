import { FontAwesome } from '@expo/vector-icons';
import { HStack, Icon, Text, View, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

import { UserImage } from '../../assets/svg';
import { Button, Input, Screen, SimpleHeader } from '../../components';
import { AccountSetupRouting, useAppNavigation } from '../../types/navigation';
import { database } from '../../config/firebaseConfig';
import { useAuthContext } from '../../contexts/auth';

const FillProfile = ({ route }: { route: AccountSetupRouting<'Fill Profile'> }) => {
  const { userId } = route.params;
  const { fillProfile } = useAuthContext();

  const [profileForm, setProfileForm] = useState({
    name: '',
    nickName: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    (async () => {
      const docRef = doc(database, 'users', userId);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (data) {
        setProfileForm({ ...profileForm, email: data.email });
      }
    })();
  }, []);

  // const navigateToCreatePIN  = () => navigation.navigate('Account Setup', { screen: 'Create PIN' })
  return (
    <Screen>
      <VStack justifyContent="center" px={'5'} pt="8" pb="8" flex={1}>
        <SimpleHeader title="Fill Your Profile" />
        <View mb="5" alignSelf="center">
          <UserImage width={120} height={120} />
          <Icon
            as={<FontAwesome name="pencil-square" />}
            size="xl"
            color="primary.500"
            position="absolute"
            right="0"
            bottom="0"
          />
        </View>

        <Input
          value={profileForm.name}
          onChangeText={(name) => setProfileForm({ ...profileForm, name })}
          placeholder="Full Name"
        />
        <Input
          value={profileForm.nickName}
          onChangeText={(nickName) => setProfileForm({ ...profileForm, nickName })}
          placeholder="Nickname"
        />
        <Input value={profileForm.email} isReadOnly placeholder="Email" />
        <Input
          value={profileForm.phoneNumber}
          onChangeText={(phoneNumber) => setProfileForm({ ...profileForm, phoneNumber })}
          placeholder="Phone Number"
          keyboardType="number-pad"
        />

        <VStack flex={1} justifyContent={'flex-end'}>
          <HStack>
            {/* <Button onPress={fillProfile} flex='1' mr='2' bg='primary.100' shadow='none'>
                        <Text color='primary.500' fontSize='lg' fontFamily='heading'>Skip</Text>
                    </Button> */}
            <Button onPress={() => fillProfile(profileForm)} flex="1" ml="2" shadow="none">
              <Text color="white" fontSize="lg" fontFamily="heading">
                Continue
              </Text>
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Screen>
  );
};

export default FillProfile;
