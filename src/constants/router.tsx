
import React from 'react';

import { Navigate } from 'react-router-dom';
export const PATH_NAMES = {
    ROOT: '/',
    HOME: '/home',
    SHOP: '/restaurant',
    LOGIN: '/login',
    DETAIL: '/restaurant/:id',
    NOTFOUND: '*',
};

const Home = React.lazy(() => import('@/app/pages/home'));
const Detail = React.lazy(() => import('@/app/pages/detail'));
const Shop = React.lazy(() => import('@/app/pages/shop'));
const Login = React.lazy(() => import('@/app/pages/login'));
const HomeAdmin = React.lazy(() => import('@/app/pages/admin/pages/Dashboard'));
const Page404 = React.lazy(() => import('@/app/pages/error/404'));
const Page501 = React.lazy(() => import('@/app/pages/error/501'));
const Product = React.lazy(() => import('@/app/pages/admin/pages/Products'));

// const Product = React.lazy(() => import('../views/dashboard/components/Product'));
// const ProductAttributes = React.lazy(() => import('../views/dashboard/components/ProductAttributes'));
// const User = React.lazy(() => import('../views/dashboard/components/User'));
export const Routers = [
    {
        path: PATH_NAMES.ROOT,
        exact: true,
        element: <Home />,
    },
    {
        path: PATH_NAMES.HOME,
        exact: true,
        element: <Navigate to={PATH_NAMES.ROOT} replace />,
    },
    {
        path: PATH_NAMES.DETAIL,
        exact: true,
        element: <Detail />,
    },
    {
        path: PATH_NAMES.SHOP,
        exact: true,
        element: <Shop />,
    },
    {
        path: PATH_NAMES.LOGIN,
        exact: true,
        element: <Login />,
    },
    // {
    //     path: PATH_NAMES.DETAIL,
    //     exact: true,
    //     element: <Detail />,
    // },
    { exact: true, path: PATH_NAMES.NOTFOUND, element: <Page404 /> },
];

export const RouterAdmins = [
    { path: '/', element: HomeAdmin },
    { path: '/order', element: Detail },
    { path: '/product', element: Product },
    { path: '/category', element: Detail },
    { path: '/*', element: Page501 },
];
