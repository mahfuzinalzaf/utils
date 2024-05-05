import { useState } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { getCookie } from '../cookie';
import { showError } from '../showError';
import axios from 'axios';

const useDeleteHandler = (secretName) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteResponse, setDeleteResponse] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const router = useRouter();

    const handleDelete = async ({ url, redirectUrl, refetch, customFn }) => {
        setIsDeleting(true);
        setDeleteResponse(null);
        setDeleteError(null);

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie(secretName)}`,
        };

        try {
            const axiosConfig = {
                method: 'DELETE',
                url: `${url}`,
                headers,
            };

            const res = await axios(axiosConfig);

            if (res.status >= 200 && res.status < 300) {
                const jsonResponse = res.data;
                setDeleteResponse(jsonResponse);

                message.success("Deleted successfully.");

                if (redirectUrl) {
                    router.push(redirectUrl);
                }
                if (refetch) {
                    refetch();
                }
                if (customFn) {
                    customFn();
                }
            } else {
                const errorResponse = res.data;
                showError(errorResponse);
                console.log(errorResponse);
            }
        } catch (err) {
            setDeleteError(err.message);
            message?.error("Something went wrong!");
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        handleDelete,
        isDeleting,
        deleteResponse,
        deleteError,
    };
};

export default useDeleteHandler;

// const { handleDelete, isDeleting, deleteResponse, deleteError } = useDeleteHandler(process.env.NEXT_PUBLIC_ADMIN_SECRET);
// const handleDeleteFn = async () => {
//     const apiUrl = getApiUrl(ENDPOINT.admin, ENDPOINT.reseller.resellers);
//     await handleDelete({ url: `${apiUrl}/${id}`, refetch: refetch, customFn: handleCloseModal });
// }
