// import logo from './logo.svg';
// import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

// components 
import Messenger from './components/Messenger';
import AccountProvider from './context/AccountProvider';

function App() {

  // Use environment variable or fallback to the current client ID
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '39004616968-771013r25avsuopsdidhguhs2iep850l.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider >
        <Messenger />
      </AccountProvider>
    </GoogleOAuthProvider >
  );
}

export default App;
