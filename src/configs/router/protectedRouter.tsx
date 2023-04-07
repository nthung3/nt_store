import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouter = ({ redirect }: any) => {
    const role = localStorage.role;
    const accessToken = localStorage.token;

    const isAdmin = role != 1 && accessToken && role;

    return isAdmin ? <Outlet /> : <Navigate to={redirect} />;
};

export default ProtectedRouter;
