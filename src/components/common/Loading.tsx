import { Center, Spinner } from "native-base";

const Loading = () => {
    return (
        <Center position={'absolute'} w='full' h={'full'} left={0} top={0} flex={1} bg='white'>
            <Spinner color='primary.500' size={80} />
        </Center>
    );
}

export default Loading;