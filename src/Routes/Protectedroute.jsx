/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoutDialog from './Logout';
import Cookies from 'js-cookie';

export default function ProtectedRoute({ Component }) {
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkToken = () => {
            const token = Cookies.get('logins');
            // Check if token is missing and user navigates away from protected route
            if (!token && location.pathname !== '/') {
                setOpenDialog(true);
            }
        };

        // Check token initially
        checkToken();

        // Listen to location changes
        const unlisten = () => {
            navigate(checkToken);
        };

        return unlisten();
    }, [navigate, location.pathname]);

    const handleLogout = () => {
        Cookies.remove('logins');
        setOpenDialog(false);
        navigate('/');
    };

    return (
        <div>
            <LogoutDialog open={openDialog} onClose={() => setOpenDialog(false)} onLogout={handleLogout} />
            <Component />
        </div>
    );
}
