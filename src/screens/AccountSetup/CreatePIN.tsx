import { HStack, IInputProps, Text, View, VStack } from 'native-base'
import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { Button, Input, Screen, SimpleHeader } from '../../components'
import { useAppNavigation } from '../../types/navigation'

const { width } = Dimensions.get('screen');
const inputSize = width / 4 - 20;

const inputProps: IInputProps = {
  fontSize: '3xl',
  textAlign: 'center',
  borderWidth: 1,
  secureTextEntry: true,
  h: inputSize,
  w: inputSize,
  maxLength: 1,
  fontFamily: 'heading',
  borderRadius: '2xl',
  keyboardType: 'number-pad'
}

const CreatePIN = () => {
  const navigation = useAppNavigation();
  const navigateToSetFingerprint = () => navigation.navigate('Account Setup', { screen: 'Set Fingerprint' })

  const [fields, setFields] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
  })

  const handleChangeField = (value: string, target: string) => {
    setFields({ ...fields, [target]: value })
  }
  return (
    <Screen>
      <VStack px={'5'} py='8' flex={1}>
        <SimpleHeader title='Create New PIN' />
        <VStack flex={1} justifyContent='center'>
          <Text 
            textAlign={'center'}
            fontFamily='body'
            fontSize='18' 
            mb={'16'}>Add a PIN number to make your account more secure</Text>

            <HStack justifyContent={'space-between'}>
              <View>
                <Input
                  value={fields.field1}
                  onChangeText={(value) => handleChangeField(value, 'field1')}
                  {...inputProps} />
              </View>
              <View>
                <Input
                  value={fields.field2}
                  onChangeText={(value) => handleChangeField(value, 'field2')}
                  {...inputProps} />
              </View>
              <View>
                <Input
                  value={fields.field3}
                  onChangeText={(value) => handleChangeField(value, 'field3')}
                  {...inputProps} />
              </View>
              <View>
                <Input
                  value={fields.field4}
                  onChangeText={(value) => handleChangeField(value, 'field4')}
                  {...inputProps} />
              </View>
            </HStack>
        </VStack>
        <VStack flex={1} justifyContent={'flex-end'}>
          <Button onPress={navigateToSetFingerprint}>
              <Text color='white' fontSize='lg' fontFamily='heading'>Continue</Text>
          </Button>
        </VStack>
      </VStack>
    </Screen>
  )
}

export default CreatePIN