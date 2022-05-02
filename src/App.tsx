import { Modal } from 'components';
import AuthProvider, { AuthIsNotSignedIn, AuthIsSignedIn } from 'context/auth';
import ConfigurationProvider from 'context/configuration';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotProtectedRoutes, ProtectedRoutes } from './router';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ConfigurationProvider>
          <AuthIsNotSignedIn>
            <NotProtectedRoutes />
          </AuthIsNotSignedIn>
          <AuthIsSignedIn>
            <ProtectedRoutes />
          </AuthIsSignedIn>
          <ToastContainer />
          <Modal />
        </ConfigurationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
