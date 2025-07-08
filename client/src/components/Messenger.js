
import { useContext } from 'react';

import { AppBar, Box, Toolbar, styled } from '@mui/material';

import { AccountContext } from '../context/AccountProvider';

// components 
import LoginDialog from "./account/LoginDialog";
import ChatDialog from './chat/ChatDialog';

const Components = styled(Box)`
    height:100vh;
    background-color:#DCDCDC;
`;

const Header = styled(AppBar)`
    height:120px;
    background-color:#00A884;
    box-shadow: none;
`;

const LoginHeader = styled(AppBar)`
    height:190px;
    background-color:#00bfa5;
    box-shadow: none;
`;


const Messenger = () => {

    const { account } = useContext(AccountContext);

    return (
        <Components>
            {
                account ?
                    <>
                        <Header>
                            <Toolbar>

                            </Toolbar>
                        </Header>
                        <ChatDialog /> {/* chat dialog */}
                    </>
                    :

                    <>
                        {/* Login dialog  */}
                        <LoginHeader>
                            <Toolbar>

                            </Toolbar>
                        </LoginHeader>
                        <LoginDialog />
                    </>
            }
        </Components>
    )
}

export default Messenger;
