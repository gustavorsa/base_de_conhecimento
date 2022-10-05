import react, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext, AuthProvider } from '../contexts/auth';

import Home from '../pages/home/Home';
import LoginPage from '../pages/loginpage/LoginPage';
import Users from '../pages/user/User';
import Sidebar from '../components/sidebar/Sidebar'

const AppRoutes = () => {
    const Private = ({children}) => {
        const {authenticate, loading} = useContext(AuthContext);

        if (loading) {
            return <div className="loading">Carregando...</div>
        }

        if(!authenticate) {
            return <Navigate to="/login"/>
        }

        return children
    }

    return (
        <Router>
            <AuthProvider>
                <Sidebar />
                    <Routes>
                        <Route path='/login'  element={<LoginPage />}/>
                        <Route exact path='/' element={<Private> <Home /> </Private>} />
                        <Route path='/user' element={<Private> <Users /> </Private>}/>
                    </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes