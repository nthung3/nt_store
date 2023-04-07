import { RouterAdmins, Routers } from '@/constants/router';
import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FormProducts from '../pages/Products/form';

const Router = () => {
    return (
        <Suspense fallback={<>loading...</>}>
            <Routes>
                {RouterAdmins.map((route, idx) => {
                    return route.element && <Route key={idx} path={route.path} element={<route.element />} />;
                })}
                <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
                <Route path="/formproducts" element={<FormProducts />} />
                <Route path="/editProduct/:productId" element={<FormProducts />} />
            </Routes>
        </Suspense>
    );
};

export default Router;
