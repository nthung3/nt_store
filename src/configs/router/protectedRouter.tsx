import React, { useState } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouter = ({ redirect }: any) => {
    const [isLogin, setIslogin] = useState(false);
    return isLogin ? <Outlet /> : <Navigate to={redirect} />;
};

export default ProtectedRouter;
