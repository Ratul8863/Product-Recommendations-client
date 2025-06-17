import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

function Updatequary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [queryData, setQueryData] = useState(null);

  useEffect(() => {
    fetch(`https://product-reco-server.vercel.app/queries/${id}`)
      .then(res => res.json())
      .then(data => setQueryData(data));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedQuery = {
      productName: form.productName.value,
      productBrand: form.productBrand.value,
      productImage: form.productImage.value,
      queryTitle: form.queryTitle.value,
      boycottingReason: form.boycottingReason.value,
    };

    const res = await fetch(`https://product-reco-server.vercel.app/queries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedQuery)
    });

    const data = await res.json();
    if (data.modifiedCount > 0) {
      alert("Query updated successfully!");
      navigate("/my-queries");
    }
  };

  if (!queryData) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Update Query</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input defaultValue={queryData.productName} name="productName" placeholder="Product Name" className="input input-bordered w-full" />
        <input defaultValue={queryData.productBrand} name="productBrand" placeholder="Product Brand" className="input input-bordered w-full" />
        <input defaultValue={queryData.productImage} name="productImage" placeholder="Product Image URL" className="input input-bordered w-full" />
        <input defaultValue={queryData.queryTitle} name="queryTitle" placeholder="Query Title" className="input input-bordered w-full" />
        <textarea defaultValue={queryData.boycottingReason} name="boycottingReason" placeholder="Boycotting Reason" className="textarea textarea-bordered w-full" />
        <button type="submit" className="btn btn-primary">Update Query</button>
      </form>
    </div>
  );
}

export default Updatequary