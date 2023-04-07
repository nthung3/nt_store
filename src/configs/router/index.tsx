import Admin from '@/app/pages/admin';
import { Routers } from '@/constants/router';


import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRouter from './protectedRouter';

const Router = () => {
    return (
        <Suspense fallback={<>loading...</>}>
            <Routes>
                {Routers.map(({ path, element }, index) => (
                    <Route key={`route-${index}`} path={path} element={element} />
                ))}
                <Route element={<ProtectedRouter redirect="/login" />}>
                    <Route path="/admin/*" element={<Admin />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default Router;
