import { useState } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { getCookie } from '../cookie';
import { showError } from '../showError';
import axios from 'axios';

const useSubmitHandler = (secretName) => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async ({ url, data, method = 'POST', redirectUrl }) => {
        setIsLoading(true);
        setResponse(null);
        setError(null);

        console.log(url, data, secretName);

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie(secretName)}`,
        };

        try {
            const axiosConfig = {
                method,
                url,
                headers,
                data,
            };

            const res = await axios(axiosConfig);

            if (res.status >= 200 && res.status < 300) {
                const jsonResponse = res.data;
                setResponse(jsonResponse);

                message.success(
                    method === 'POST' ? 'Created successfully.' : 'Updated successfully.'
                );

                if (redirectUrl) {
                    router.push(redirectUrl);
                }
            } else {
                const errorResponse = res.data;
                showError(errorResponse);
                console.log(errorResponse);
            }
        } catch (err) {
            setError(err.message);
            message?.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        handleSubmit,
        isLoading,
        response,
        error,
    };
};

export default useSubmitHandler;



// const { error, handleSubmit: handlePostRequest, isLoading, response } = useSubmitHandler(process.env.NEXT_PUBLIC_ADMIN_SECRET)
// await handlePostRequest({ data: postData, redirectUrl: `/admin/reseller/${id}`, url: `${apiUrl}/${id}`, method: "PUT" });
