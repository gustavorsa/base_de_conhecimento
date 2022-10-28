import react, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext, AuthProvider } from '../contexts/auth';

import Home from '../pages/home/Home';
import Sidebar from '../components/sidebar/Sidebar'
import Login from '../pages/loginpage/Login';
import { Loader } from '../components/loading/Loader';
import AdminPage from '../pages/adminpage/AdminPage';
import Skeletons from '../components/skeleton/Skeleton';
import Commerce from '../pages/commerce/Commerce';
import EditPage from '../pages/editPage/EditPage';

const AppRoutes = () => {
    const Private = ({children}) => {
        const {authenticate, loading} = useContext(AuthContext);

        if (loading) {
            return <Loader />
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
                        <Route path='/login'  element={<Login />}/>
                        <Route path='/skeleton'  element={<Skeletons />}/>
                        <Route path='/loader'  element={<Loader />}/>
                        <Route exact path='/' element={<Private> <Home /> </Private>} />
                        <Route path='/adminpage' element={<Private> <AdminPage /> </Private>}/>
                        <Route path='/artigos/commerce' element={<Private><Commerce/></Private>}></Route>
                        <Route path='/aditpage' element={<Private><EditPage/></Private>}></Route>
                    </Routes>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes