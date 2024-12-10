import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement signup logic
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const inputClasses = "mt-1 block w-full rounded-md bg-[rgba(255,255,255,0.1)] border-[rgba(255,51,102,0.3)] text-white shadow-sm focus:border-[rgba(255,51,102,0.6)] focus:ring focus:ring-[rgba(255,51,102,0.3)] focus:ring-opacity-50 transition-all duration-300";
  const labelClasses = "block font-tag text-white text-shadow";

  return (
    <div className="min-h-screen pt-20 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-[rgba(255,51,102,0.1)] backdrop-blur-sm shadow-lg sm:rounded-3xl sm:p-20 border border-[rgba(255,51,102,0.3)]">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-[rgba(255,255,255,0.1)]">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-3xl font-tag text-white text-center mb-8 text-shadow">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className={labelClasses}>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-[rgba(255,51,102,0.3)] rounded-md shadow-sm text-lg font-tag text-white bg-[rgba(255,51,102,0.2)] hover:bg-[rgba(255,51,102,0.3)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgba(255,51,102,0.6)] transition-all duration-300 hover:scale-105"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
