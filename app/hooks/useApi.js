import { useState, useCallback } from 'react';

const useApi = (apiFunction) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (params) => {
        setLoading(true);
        setError(null);

        try {
            const result = await apiFunction(params);
            setData(result);
            return result;
        } catch (err) {
            setError(err);
            throw err; 
        } finally {
            setLoading(false);
        }
    }, [apiFunction]);

    return { loading, data, error, refetch: fetchData };
};

export default useApi;