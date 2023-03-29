import { RouterAdmins, Routers } from '@/constants/router';
import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Router = () => {
    return (
        <Suspense fallback={<>loading...</>}>
            <Routes>
                {RouterAdmins.map((route, idx) => {
                    return route.element && <Route key={idx} path={route.path} element={<route.element />} />;
                })}
                <Route path="/admin" element={<Navigate to="dashboard" replace />} />
            </Routes>
        </Suspense>
    );
};

export default Router;
