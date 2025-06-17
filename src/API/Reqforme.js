export const recforme = email =>{
  return  fetch(`https://product-reco-server-i9d009gff-ratul8863s-projects.vercel.app/queries?email=${email}`).then(res=>res.json())
}