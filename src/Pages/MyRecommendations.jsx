import React, { Suspense, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import Looding1 from './Shared/Looding/Looding1';
import Reclist from './Reclist/Reclist';
import { myRecPromise } from '../API/Myrec';

const MyRecommendations = () => {
  const { user,recommender} = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);

  // console.log(recommender)
console.log("Loged in user",user.email)
  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`http://localhost:5000/recommendations?email=${user.email}`)
  //       .then(res => res.json())
  //       .then(data => setRecommendations(data))
  //       .catch(err => console.error('Failed to fetch recommendations', err));
  //   }
  // }, [user]);

 

  // if (!user?.email) return <p className="text-center mt-10">Please login to view your recommendations.</p>;

  // if (!Array.isArray(recommendations) || recommendations.length === 0) {
  //   return (
  //     <div className="text-center mt-10">
  //       <h2 className="text-xl font-semibold">No recommendations found.</h2>
  //     </div>
  //   );
  // }

  return (

    <>

       <Suspense fallback={<Looding1></Looding1>}>
            {/* <ApplicationsList myApplicationPromise={myApplicationPromise(user.email)}>
            </ApplicationsList> */}
            <Reclist myRecPromise={myRecPromise(user.email)}></Reclist>
        </Suspense>
   
    </>
    
  );
};

export default MyRecommendations;
