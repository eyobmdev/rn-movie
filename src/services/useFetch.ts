import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunc: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      setError(null);
      const result = await fetchFunc();
      setData(result);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An Error occurred."),
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setData(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);
  
  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
