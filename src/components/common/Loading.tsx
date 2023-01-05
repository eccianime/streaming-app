import { Center, Spinner } from 'native-base';
import { useAppContext } from '../../contexts/app';

const Loading = () => {
  const { isDarkMode } = useAppContext();
  return (
    <Center
      position={'absolute'}
      w="full"
      h={'full'}
      left={0}
      top={0}
      flex={1}
      bg={isDarkMode ? 'rgba(0,0,0, 0.8)' : 'rgba(255, 255,255, 0.5)'}
    >
      <Spinner color="primary.500" size={80} />
    </Center>
  );
};

export default Loading;
