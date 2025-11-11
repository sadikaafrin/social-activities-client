import React, { useState } from "react";
import { toast } from 'react-toastify';

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    toast.success(`Thank you for subscribing with ${email}! You'll receive our latest news soon.`);
    setEmail("");
  };

  return (
    <div className="bg-slate-900 px-4 sm:px-6 text-center text-white py-16 sm:py-20 flex flex-col items-center justify-center max-w-7xl mx-auto">
      <p className="text-indigo-500 font-medium">Get updated</p>
      <h1 className="max-w-lg font-semibold text-4xl/[44px] mt-2">
        Subscribe to our newsletter & get the latest news
      </h1>
      <div className="flex items-center justify-center mt-10 border border-slate-600 focus-within:outline focus-within:outline-indigo-600 text-sm rounded-full h-14 max-w-md w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent outline-none rounded-full px-4 h-full flex-1"
          placeholder="Enter your email address"
        />
        <button 
          onClick={handleSubscribe}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full h-11 mr-1 px-8 flex items-center justify-center transition-colors"
        >
          Subscribe now
        </button>
      </div>
    </div>
  );
};

export default Subscribe;