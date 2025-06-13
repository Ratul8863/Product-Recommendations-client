import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const MyQueries = () => {
  const { user } = useContext(AuthContext);
  const [queries, setQueries] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [formData, setFormData] = useState({});
console.log(queries)
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/queries?email=${user.email}`)
        .then(res => res.json())
        .then(data => setQueries(data));
    }
  }, [user]);

  
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this query?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:5000/queries/${id}`, {
      method: 'DELETE'
    });

    const data = await res.json();
    if (data.deletedCount > 0) {
      alert("Query deleted successfully.");
      setQueries(prev => prev.filter(query => query._id !== id));
    }
  };

  const openModal = (query) => {
    setSelectedQuery(query);
    setFormData(query);
    setModalIsOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/queries/${selectedQuery._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (data.modifiedCount > 0) {
      alert("Query updated!");
      setModalIsOpen(false);

      const updated = await fetch(`http://localhost:5000/queries?email=${user.email}`);
      const updatedData = await updated.json();
      setQueries(updatedData);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Stylish Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-950 to-indigo-600 rounded-xl mb-12 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-12 sm:py-16 lg:py-20 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Manage Your Product Queries Easily
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Submit, Update, and Track your Product-related Concerns in One Place
          </p>
          <Link to="/add-query" className="btn btn-secondary bg-white text-blue-600 border-0 hover:bg-gray-200">
            + Add New Query
          </Link>
        </div>
      </div>

      {/* Query Section */}
      {queries.length === 0 ? (
        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold mb-4">No queries found.</h2>
          <Link to="/add-query" className="btn btn-primary">Add Your First Query</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1  gap-6">
          {queries
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(query => (

             <div key={query._id} className="border  rounded-2xl p-4 bg-white shadow">
               <div className='flex w-full justify-between '>
                 <div className="flex  items-center gap-3 mb-2">
                  <img src={query.userPhoto} alt={query.userName} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold">{query.userName}</p>
                    {/* <p className="text-sm text-gray-500">{new Date(rec.createdAt).toLocaleString()}</p> */}
                    <p className="text-sm text-gray-500 mt-1">
                    <strong>Submitted:</strong> {new Date(query.createdAt).toLocaleString()}
                   </p>
                  </div>
                </div>
                 <div className=" flex    gap-x-2">
                    <Link to={`/query/${query._id}`} className="btn btn-sm btn-info">View Details</Link>
                    <button onClick={() => openModal(query)} className="btn btn-sm btn-warning">Update</button>
                   <button onClick={() => handleDelete(query._id)} className="btn btn-sm btn-error">Delete</button>
               </div>
               </div>
                  <h4 className="text-lg font-bold">{query. queryTitle}</h4>
                <p><span className="font-medium">Product:</span> {query. productName}</p>
                <img src={query.productImage} alt="Recommended" className="w-28 rounded mt-2" />
                <p className="mt-2">{query.boycottingReason}</p>
               
              </div>
              
          ))}
        </div>
      )}

      {/* Update Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-6 rounded-lg max-w-xl mx-auto mt-20 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Update Query</h2>
        {selectedQuery && (
          <form onSubmit={handleUpdate} className="space-y-4">
            <input type="text" name="productName" value={formData.productName || ''} onChange={handleChange} placeholder="Product Name" className="input input-bordered w-full" />
            <input type="text" name="productBrand" value={formData.productBrand || ''} onChange={handleChange} placeholder="Product Brand" className="input input-bordered w-full" />
            <input type="text" name="productImage" value={formData.productImage || ''} onChange={handleChange} placeholder="Image URL" className="input input-bordered w-full" />
            <input type="text" name="queryTitle" value={formData.queryTitle || ''} onChange={handleChange} placeholder="Query Title" className="input input-bordered w-full" />
            <textarea name="boycottingReason" value={formData.boycottingReason || ''} onChange={handleChange} placeholder="Boycotting Reason" className="textarea textarea-bordered w-full" />
            <div className="flex gap-4">
              <button type="submit" className="btn btn-primary w-full">Update</button>
              <button type="button" onClick={() => setModalIsOpen(false)} className="btn w-full">Cancel</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default MyQueries;





// boycottingReason
// : 
// "amra jani na ki koralagbe"
// createdAt
// : 
// "2025-06-10T07:07:58.465Z"
// productBrand
// : 
// "tanvurui ajaj"
// productImage
// : 
// "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
// productName
// : 
// "amra valo"
// queryTitle
// : 
// "hobe ekdin"
// recommendationCount
// : 
// 0
// userEmail
// : 
// "ratulroy8863@gmail.com"
// userName
// : 
// "Ratul Saha Roy"
// userPhoto
// : 
// "https://lh3.googleusercontent.com/a/ACg8ocJfCIH8YbvErfuJWcDcBdGX-D9qP9--EQJ0q4Ss2GLc_yqD6CY=s96-c"
// _id
// : 
// "6847d9ce669907165c28e77b"



// <div key={query._id} className="card bg-white shadow-lg rounded-lg overflow-hidden">
//                 <img src={query.productImage} alt={query.productName} className="w-full h-48 object-cover" />
//                 <div className="p-4">
//                   <h3 className="text-xl font-bold mb-1">{query.queryTitle}</h3>
//                   <p className="text-sm text-gray-600"><strong>Brand:</strong> {query.productBrand}</p>
//                   <p className="text-sm text-gray-500 mt-1">
//                     <strong>Submitted:</strong> {new Date(query.createdAt).toLocaleString()}
//                   </p>
//                   <div className="flex justify-between items-center mt-4 gap-2">
//                     <Link to={`/query/${query._id}`} className="btn btn-sm btn-info">View Details</Link>
//                     <button onClick={() => openModal(query)} className="btn btn-sm btn-warning">Update</button>
//                     <button onClick={() => handleDelete(query._id)} className="btn btn-sm btn-error">Delete</button>
//                   </div>
//                 </div>
//               </div>