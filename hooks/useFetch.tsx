import { useEffect, useState } from "react";

const useFetch = <T,>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      setData(null);
      const result = await fetchFunction();
      setData(result);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("Error fetching data")
      );
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { refetch: fetchData, data, error, loading, reset };
};
export default useFetch;
