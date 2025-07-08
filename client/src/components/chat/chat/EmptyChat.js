// right part 
import styled from '@emotion/styled';
import {emptyChatImage} from '../../../constants/data';
import { Box, Typography, Divider } from '@mui/material';

// styled 
const Component = styled(Box)`
    background: #f8f9fa;
    padding: 30px 0;
    text-align: center;
    height: 100vh;
`;

const Container = styled(Box)`
    padding: 0 140px;
`;

const Image = styled('img')({
  marginTop: 90,
  width: 400
})

const Title = styled(Typography)`
    font-size: 32px;
    font-family: inherit;
    font-weight: 300;
    color: #41525d;
    margin-top: 25px 0 10px 0;
`;

const SubTitle = styled(Typography)`
    font-size: 14px;
    color: #667781;
    font-weight: 400;
    font-family: inherit;
`;

const StyledDivider = styled(Divider)`
    margin: 40px 0;
    opacity: 0.4;
`;


const EmptyChat = () => {
  return (
    <>
      <Component>
        <Container>
          <Image src={emptyChatImage} alt='image' />
          <Title>WhatsApp Web</Title>
          <SubTitle>Not send and receive messages without keeping your phone online.</SubTitle>
          <SubTitle>Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</SubTitle>
          <StyledDivider />
        </Container>
      </Component>
    </>
  )
}

export default EmptyChat;
