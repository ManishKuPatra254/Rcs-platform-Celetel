/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
    const { Component } = props;
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (!token) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Component />
        </div>
    );
}
