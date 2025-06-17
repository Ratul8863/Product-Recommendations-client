export const myRecPromise = email => {
  return fetch(`http://localhost:5000/recommendations?email=${email}`, {
    credentials: 'include',
  })
  .then(res => {
    if (!res.ok) throw new Error('Unauthorized or server error');
    return res.json();
  });
};
