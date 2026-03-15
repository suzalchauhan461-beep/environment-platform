import { useEffect, useState } from 'react';
import api from '../services/api';

const useLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    api
      .get('/lessons')
      .then((res) => {
        if (mounted) {
          setLessons(res.data);
        }
      })
      .catch(() => {
        if (mounted) {
          setLessons([]);
        }
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);
  return { lessons, loading };
};

export default useLessons;
