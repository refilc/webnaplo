import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import MainLayout from './ui/main/layout.tsx';
import ErrorLayout from './ui/error/layout.tsx';
import TimelineLayout from './ui/timeline/layout.tsx';
// import AppLayout from './app/layout.tsx';
// import AuthLayout from './auth/layout.tsx';
// import { Settings } from "./utils/settings.ts";
// import { UserDB } from './utils/db/user.ts';
// import { LoginUser } from './models/user.ts';

// const authedUser = async (): Promise<LoginUser | null> => {
//     const userID = Settings.get('currentUser');
//     const user = await UserDB.getUser(userID);
//     console.log(userID + ' ' + user?.id + ' ' + user);
//     if (!user) return null;
//     return user;
// }

const router = createBrowserRouter([
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
    // {
    //     path: '/app',
    //     loader: () => {
    //         return redirect('/auth/login');
    //     },
    // },
    // {
    //     path: '/auth',
    //     loader: () => {
    //         return redirect('/auth/login');
    //     },
    // },
    // {
    //     path: '/app/:page',
    //     element: <AppLayout />,
    //     loader: async () => {
    //         const user = await authedUser();
    //         if(!user) return redirect('/auth/login');
    //         return user;
    //     },
    // },
    // {
    //     path: '/auth/:page',
    //     element: <AuthLayout />,
    //     loader: async ({ params }) => {
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
