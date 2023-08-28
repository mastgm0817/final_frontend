// hooks/useFetchData.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react'
interface Datum {
  dimension_value: string;
  metric_value: number;
}

const useFetchData = (dim: string, met: string, startDate?: string, endDate?: string) => {
  const [data, setData] = useState<Datum[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | Error>(null);
  const URL = process.env.NEXT_PUBLIC_URL;
  const API_URL = URL + "/admin/GA";
  const session = useSession();
  const token = session.data?.user.id;

  useEffect(() => {
    axios.get(`${API_URL}/${dim}/${met}/${startDate}/${endDate}`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setData(response.data);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [dim, met, startDate, endDate]);

  return { data, loading, error };
};

export default useFetchData;
