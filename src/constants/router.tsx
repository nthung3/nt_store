import Home from '@/app/pages/home';
import { Navigate } from 'react-router-dom';
export const PATH_NAMES = {
    ROOT: '/',
    HOME: '/home',
    SHOP: '/shop',
    DETAIL: '/shop/:id',
    NOTFOUND: '*',
};

// const Order = React.lazy(() => import('../views/dashboard/components/Order'));
// const Product = React.lazy(() => import('../views/dashboard/components/Product'));
// const ProductAttributes = React.lazy(() => import('../views/dashboard/components/ProductAttributes'));
// const User = React.lazy(() => import('../views/dashboard/components/User'));
export const Routers = [
    {
        path: PATH_NAMES.ROOT,
        exact: true,
        element: <Navigate to={PATH_NAMES.HOME} replace />,
    },
    {
        path: PATH_NAMES.HOME,
        exact: true,
        element: <Home />,
    },
    // {
    //     path: PATH_NAMES.SHOP,
    //     exact: true,
    //     element: <Shop />,
    // },
    // {
    //     path: PATH_NAMES.DETAIL,
    //     exact: true,
    //     element: <Detail />,
    // },
    // { exact: true, path: PATH_NAMES.NotFound, element: <NotFound /> },
];

export const RouterAdmins = [
    { path: '/', element: <>das</> },
    { path: '/order', element: <>das</> },
    { path: '/product', element: <>das</> },
    { path: '/productsttributes', element: <>das</> },
];
