import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import Looding1 from './Shared/Looding/Looding1';
import Reclist from './Reclist/Reclist';

const MyRecommendations = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://product-reco-server-i9d009gff-ratul8863s-projects.vercel.app/recommendations?email=${user.email}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setRecommendations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) return <Looding1 />;

  return (
    <Reclist
      recommendations={recommendations}
      setRecommendations={setRecommendations}
    />
  );
};

export default MyRecommendations;
