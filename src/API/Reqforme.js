export const recforme = email =>{
  return  fetch(`http://localhost:5000/queries?email=${email}`).then(res=>res.json())
}