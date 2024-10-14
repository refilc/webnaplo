import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import MainLayout from './ui/main/layout.tsx';
import ErrorLayout from './ui/error/layout.tsx';
import TimelineLayout from './ui/timeline/layout.tsx';
import AdminLayout from './ui/admin/layout.tsx';
import AppLayout from './ui/app/layout.tsx';
import { UserDB } from './utils/db/user.ts';
// import AuthLayout from './ui/auth/layout.tsx';
import { LoginUser } from './models/user.ts';
import { Settings } from './utils/settings.ts';
import NewMainLayout from './ui/main_new/layout.tsx';
import PaymentLayout from './ui/payment/layout.tsx';
// import { AdminUser } from './models/adminuser.ts';
// import { AdminUserDB } from './utils/db/adminuser.ts';
// import AppLayout from './app/layout.tsx';
// import AuthLayout from './auth/layout.tsx';
// import { Settings } from "./utils/settings.ts";
// import { UserDB } from './utils/db/user.ts';
// import { LoginUser } from './models/user.ts';

const authedUser = async (): Promise<LoginUser | null> => {
    const userID = Settings.get('currentUser');
    const user = await UserDB.getUser(userID);
    console.log(userID + ' ' + user?.id + ' ' + user);
    if (!user) return null;
    return user;
}

const adminAuthedUser = async (): Promise<string | null> => {
    const userID = window.localStorage.getItem('admin_uid') ?? '';
    const accessToken = window.localStorage.getItem('admin_token') ?? '';
    // const user = await AdminUserDB.getUser(userID);
    // console.log(userID + ' ' + user?.id + ' ' + user);
    // if (!user) return null;
    // return user;
    if (userID != '' && accessToken != '') {
        return userID;
    }
    return null;
}

const router = createBrowserRouter([
    // temp
    {
        path: '/v5',
        element: <NewMainLayout currentPage='home' />,
    },
    // app/main routes
    {
        path: '/',
        element: <MainLayout currentPage='home'/>,
    },
    {
        path: '/privacy-policy',
        element: <MainLayout currentPage='privacy'/>,
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
    // {
    //     path: '/auth/:page',
    //     element: <AuthLayout />,
    //     loader: async ({ params }) => {


    //         // temp admin check
    //         const userID = await adminAuthedUser();
    //         if (userID == null) return redirect('/');

    //         // auth redir things
    //         const user = await authedUser();
    //         if (user && params.page == 'logout') {
    //             UserDB.deleteUser(user.id);
    //             window.localStorage.clear();
    //         } else if (user) {
    //             return redirect('/app/home');
    //         }
    //         if (params.page == 'logout') {
    //             return redirect('/');
    //         }
    //         return null;
    //     },
    // },
    // timeline links
    {
        path: '/timeline',
        element: <TimelineLayout currentPage={'home'} />
    },
    // admin links
    {
        path: '/admin',
        loader: () => {
            return redirect('/admin/login');
        },
    },
    {
        path: '/admin/:page',
        element: <AdminLayout />,
        loader: async ({ params }) => {
            const userID = await adminAuthedUser();
            if (userID != null && params.page == 'logout') {
                // AdminUserDB.deleteUser(userID);
                window.localStorage.clear();
            } else if (userID != null && (params.page != 'home' && params.page != 'coupons')) {
                return redirect('/admin/home');
            }
            if (params.page == 'logout') {
                return redirect('/');
            }
            if (userID == null && params.page != 'login') {
                return redirect('/admin/login');
            }
            return null;
        },
    },
    // payment links
    {
        path: '/payment/paypal/mobile-checkout',
        element: <PaymentLayout currentPage='pp-mobile-checkout' />,
    },
    // go quick links
    {
        path: '/go/:link',
        loader: async ({ params }) => {
            switch (params.link) {
                case 'cors':
                    return redirect('https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS');
                case 'cors-proxy':
                    return redirect('https://httptoolkit.com/blog/cors-proxies/');
                default:
                    return redirect('/');
            }
        },
    },
    // go social links
    {
        path: '/go/s/:platform',
        loader: async ({ params }) => {
            switch (params.platform) {
                case 'tiktok':
                    return redirect('https://www.tiktok.com/@refilc.hu');
                case 'discord':
                    return redirect('https://discord.com/invite/7d6cn3Yypz');
                case 'instagram':
                    return redirect('https://www.instagram.com/refilcapp/');
                case 'github':
                    return redirect('https://github.com/refilc?view_as=public');
                case 'github-releases':
                    return redirect('https://github.com/refilc/naplo/releases');
                default:
                    return redirect('/');
            }
        },
    },
    // normal social links
    {
        path: '/:platform',
        loader: async ({ params }) => {
            switch (params.platform) {
                case 'tiktok':
                    return redirect('https://www.tiktok.com/@refilc.hu');
                case 'discord':
                    return redirect('https://discord.com/invite/7d6cn3Yypz');
                case 'instagram':
                    return redirect('https://www.instagram.com/refilcapp/');
                case 'github':
                    return redirect('https://github.com/refilc?view_as=public');
                case 'github-releases':
                    return redirect('https://github.com/refilc/naplo/releases');
                default:
                    return redirect('/');
            }
        },
    },
    {
        path: '*',
        element: <ErrorLayout />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
