import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(url, {
          signal: controller.signal,
        });

        const result = response.data;

        setData(Array.isArray(result) ? result : result.users || []);
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          setError("Unable to load data. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}