"use client"
import React from 'react'
import { getApiUrl } from '@/helper/getApiUrl';
import { ENDPOINT } from '@/helper/endpoint';

const AdminLogin = () => {
    const authInfo = JSON.parse(typeof window !== "undefined" ? localStorage.getItem(process.env.NEXT_PUBLIC_ADMIN_SECRET) : false);

    const onSubmit = async (data) => {
        const loginData = {
            email: data?.username,
            password: data?.password,
        }
        await handleLogin({
            loginData: loginData,
            redirectUrl: "/admin/dashboard",
            secretName: process.env.NEXT_PUBLIC_ADMIN_SECRET,
            url: getApiUrl(ENDPOINT.admin, ENDPOINT.auth.login),
            remember: remember,
        })
    };

    return (
        <div className='h-screen flex items-center justify-center'>
            <div className='w-[95.56%] xl:w-[1082px] mx-auto px-2 lg:px-[100px] lg:pt-[60px] pt-2.5 pb-3 lg:pb-[60px] admin-login-shadow '>
                <form action="">

                </form>

            </div>
        </div>
    )
}

export default AdminLogin;