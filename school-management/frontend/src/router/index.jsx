import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Users from '../pages/Users';
import NotFound from '../pages/NotFound';
import Layout from '../layouts/Layout';
import GuestLayout from '#layouts/guestLyout.jsx';
import StudentDashboardLayout from '#layouts/Student/studentDashboardLayout.jsx';
import StudentDashboard from '#components/students/StudentDashboard.jsx';
import { STUDENT_DASHOARD_ROUTE } from '@/router/routes.js';


//export const STUDENT_DASHOARD_ROUTE = '/student/dashboard'
export const LOGIN_ROUTE = '/login'


export const router = createBrowserRouter([
    {
        element: <Layout />,
        children:[
        {
            path:'/',
            element: <Home />
        },

        {
            path:'/register',
            element:<Register />
        },
        {
            path:'/users',
            element: <Users />
        },

        {
            path:'*',
            element: <NotFound />
        }
        ]
    },

    {
        element: <GuestLayout />,
        children: [
            {
                path:LOGIN_ROUTE,
                element:<Login />
            },
        ]
    },

    {
        element: <StudentDashboardLayout />,
        children: [
            {
                path:STUDENT_DASHOARD_ROUTE,
                element: <StudentDashboard/>
            },
        ]
    },

])
