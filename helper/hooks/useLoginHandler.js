import { useRouter } from 'next/navigation';
import { setCookie } from '../cookie';
import { useState } from 'react';
import { message } from 'antd';

export const useLoginHandler = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async ({ url, loginData, redirectUrl, secretName, remember }) => {
        console.log(url);
        setIsLoading(true);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.log(errorResponse);
                if (errorResponse) {
                    if (errorResponse?.message) {
                        message.error(`${errorResponse?.message}`)
                    } else {
                        const errorsArray = Array.isArray(errorResponse) ? errorResponse : [errorResponse];
                        for (const item of errorsArray) {
                            if (typeof item === 'object') {
                                const property = Object.keys(item)[0];
                                const errorMessage = item[property].toString();
                                message.error(`asdf${errorMessage}`);
                            } else {
                                const errorMessage = item.toString();
                                message.error(`sss${errorMessage}`);
                            }
                            break;
                        }
                    }
                }
                throw new Error(errorResponse?.message || 'Login failed');
            }

            const res = await response.json();
            if (res?.success) {
                console.log(res);
                if (remember) {
                    localStorage.setItem(secretName, JSON.stringify(loginData));
                } else {
                    localStorage.removeItem(secretName);
                }
                setCookie(secretName, res?.data?.token, 3);
                message.success('Login successfully!');
            }
            router.push(redirectUrl);
        } catch (error) {
            // alert(`Login Failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        handleLogin,
        isLoading,
    };
};
