import { Center, Spinner } from "native-base";

const Loading = () => {
    return (
        <Center flex={1} bg='primary.500'>
            <Spinner color='white' size='lg' />
        </Center>
    );
}

export default Loading;