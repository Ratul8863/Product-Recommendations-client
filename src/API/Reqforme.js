export const recforme = email =>{
  return  fetch(`https://product-reco-server.vercel.app/queries?email=${email}`).then(res=>res.json())
}