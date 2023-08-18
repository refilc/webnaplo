import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import MainLayout from './main/layout.tsx';
import AppLayout from './app/layout.tsx';
import AuthLayout from './auth/layout.tsx';
import { Settings } from "./utils/settings.ts";
import { UserDB } from './utils/db/users.ts';
import { LoginUser } from './models/user.ts';

const authedUser = async (): Promise<LoginUser | null> => {
    const userID = Settings.get('currentUser');
    const user = await UserDB.getUser(userID);
    console.log(userID + ' ' + user?.id + ' ' + user);
    if (!user) return null;
    return user;
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
    },
    {
        path: '/login',
        loader: () => {
            return redirect('/auth/login');
        },
    },
    {
        path: '/app',
        loader: () => {
            return redirect('/auth/login');
        },
    },
    {
        path: '/auth',
        loader: () => {
            return redirect('/auth/login');
        },
    },
    {
        path: '/app/:page',
        element: <AppLayout />,
        loader: async () => {
            const user = await authedUser();
            if(!user) return redirect('/auth/login');
            return user;
        },
    },
    {
        path: '/auth/:page',
        element: <AuthLayout />,
        loader: async ({ params }) => {
            const user = await authedUser();
            if (user && params.page == 'logout') {
                UserDB.deleteUser(user.id);
                window.localStorage.clear();
            } else if (user) {
                return redirect('/app/home');
            }
            if (params.page == 'logout') {
                return redirect('/');
            }
            return null;
        },
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
