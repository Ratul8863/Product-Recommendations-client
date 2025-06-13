import React from 'react';

const ExtraSection2 = () => {
  return (
    <div className="bg-blue-950 text-white shadow-2xl rounded-4xl p-10 text-center max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Stats that Matter</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div>
          <p className="text-4xl font-bold">500+</p>
          <p className="text-sm md:text-base">Queries Submitted</p>
        </div>
        <div>
          <p className="text-4xl font-bold">1200+</p>
          <p className="text-sm md:text-base">Recommendations Made</p>
        </div>
        <div>
          <p className="text-4xl font-bold">250+</p>
          <p className="text-sm md:text-base">Active Users</p>
        </div>
      </div>
    </div>
  );
};

export default ExtraSection2;
