export const myRecPromise = email =>{
  return  fetch(`http://localhost:5000/recommendations?email=${email}`).then(res=>res.json())
}