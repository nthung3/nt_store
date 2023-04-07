import { AiOutlineCalendar, AiOutlineShoppingCart } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiBarChart, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBoxSeam, BsChatLeft } from 'react-icons/bs';
import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine } from 'react-icons/ri';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';


export const links = [
    {
        title: 'Dashboard',
        links: [
            {
                name: 'Dashboard',
                url: 'admin/dashboard',
                icon: <FiShoppingBag />,
            },
        ],
    },

    {
        title: 'Pages',
        links: [
            {
                name: 'orders',
                url: 'admin/order',
                icon: <AiOutlineShoppingCart />,
            },
            {
                name: 'employees',
                url: 'admin/employees',
                icon: <IoMdContacts />,
            },
            {
                name: 'customers',
                url: 'admin/customer',
                icon: <RiContactsLine />,
            },
            {
                name: 'products',
                url: 'admin/product',
                icon: <BsBoxSeam />,
            },
        ],
    },
    {
        title: 'Apps',
        links: [
            {
                name: 'calendar',
                url: 'admin/calendar',
                icon: <AiOutlineCalendar />,
            },
            {
                name: 'kanban',
                url: 'admin/kanban',
                icon: <BsKanban />,
            },
            {
                name: 'editor',
                url: 'admin/editor',
                icon: <FiEdit />,
            },
            {
                name: 'color-picker',
                url: 'admin/color-picker',
                icon: <BiColorFill />,
            },
        ],
    },
];

export const earningData = [
    {
        icon: <MdOutlineSupervisorAccount />,
        amount: '39,354',
        percentage: '-4%',
        title: 'Customers',
        iconColor: '#03C9D7',
        iconBg: '#E5FAFB',
        pcColor: 'red-600',
    },
    {
        icon: <BsBoxSeam />,
        amount: '4,396',
        percentage: '+23%',
        title: 'Products',
        iconColor: 'rgb(255, 244, 229)',
        iconBg: 'rgb(254, 201, 15)',
        pcColor: 'green-600',
    },
    {
        icon: <FiBarChart />,
        amount: '423,39',
        percentage: '+38%',
        title: 'Sales',
        iconColor: 'rgb(228, 106, 118)',
        iconBg: 'rgb(255, 244, 229)',

        pcColor: 'green-600',
    },
    {
        icon: <HiOutlineRefresh />,
        amount: '39,354',
        percentage: '-12%',
        title: 'Refunds',
        iconColor: 'rgb(0, 194, 146)',
        iconBg: 'rgb(235, 250, 242)',
        pcColor: 'red-600',
    },
];

export const medicalproBranding = {
    data: [
        {
            title: 'Due Date',
            desc: 'Oct 23, 2021',
        },
        {
            title: 'Budget',
            desc: '$98,500',
        },
        {
            title: 'Expense',
            desc: '$63,000',
        },
    ],
    teams: [
        {
            name: 'Bootstrap',
            color: 'orange',
        },
        {
            name: 'Angular',
            color: '#FB9678',
        },
    ],
};

export const weeklyStats = [
    {
        icon: <FiShoppingCart />,
        amount: '-$560',
        title: 'Top Sales',
        desc: 'Johnathan Doe',
        iconBg: '#FB9678',
        pcColor: 'red-600',
    },
    {
        icon: <FiStar />,
        amount: '-$560',
        title: 'Best Seller',
        desc: 'MaterialPro Admin',
        iconBg: 'rgb(254, 201, 15)',
        pcColor: 'red-600',
    },
    {
        icon: <BsChatLeft />,
        amount: '+$560',
        title: 'Most Commented',
        desc: 'Ample Admin',
        iconBg: '#00C292',
        pcColor: 'green-600',
    },
];

export const SparklineAreaData = [
    { x: 1, yval: 2 },
    { x: 2, yval: 6 },
    { x: 3, yval: 8 },
    { x: 4, yval: 5 },
    { x: 5, yval: 10 },
];

export const ecomPieChartData = [
    { x: '2018', y: 18, text: '35%' },
    { x: '2019', y: 18, text: '15%' },
    { x: '2020', y: 18, text: '25%' },
    { x: '2021', y: 18, text: '25%' },
];

export const StackedData = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export const SparkData = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export const PieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];
