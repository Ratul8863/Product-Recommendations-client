export const myRecPromise = email => {
  return fetch(`https://product-reco-server.vercel.app/recommendations?email=${email}`, {
    credentials: 'include',
  })
  .then(res => {
    if (!res.ok) throw new Error('Unauthorized or server error');
    return res.json();
  });
};
