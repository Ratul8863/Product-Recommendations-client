import React from "react";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useParams } from "react-router";


const AddQuery = () => {
  const { user } = useContext(AuthContext);
 const {id : jobid} = useParams();
    console.log(jobid)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newQuery = {
      likes: [],
      productName: form.productName.value,
      productBrand: form.productBrand.value,
      productImage: form.productImage.value,
      queryTitle: form.queryTitle.value,
      boycottingReason: form.boycottingReason.value,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      createdAt: new Date().toISOString(),
      recommendationCount: 0,
    };

    const res = await fetch("http://localhost:5000/queries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuery),
    });

    const data = await res.json();
    if (data.insertedId) {
      alert("Query added successfully!");
      form.reset();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-3xl font-bold mb-6">Add New Query</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="productName" placeholder="Product Name" className="input input-bordered w-full" required />
        <input name="productBrand" placeholder="Product Brand" className="input input-bordered w-full" required />
        <input name="productImage" placeholder="Product Image URL" className="input input-bordered w-full" required />
        <input name="queryTitle" placeholder="Query Title" className="input input-bordered w-full" required />
        <textarea name="boycottingReason" placeholder="Boycotting Reason Details" className="textarea textarea-bordered w-full" required />
        <button className="btn btn-primary w-full">Add Query</button>
      </form>
    </div>
  );
};

export default AddQuery;
