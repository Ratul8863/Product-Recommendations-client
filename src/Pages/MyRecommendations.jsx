import React, { Suspense, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import Looding1 from './Shared/Looding/Looding1';
import Reclist from './Reclist/Reclist';
import { myRecPromise } from '../API/Myrec';

const MyRecommendations = () => {
  const { user,recommender} = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);

console.log("Loged in user",user.email)
  return (

    <>

       <Suspense  fallback={<Looding1></Looding1>}>
            <Reclist myRecPromise={myRecPromise(user.email)}></Reclist>
        </Suspense>
   
    </>
    
  );
};

export default MyRecommendations;
