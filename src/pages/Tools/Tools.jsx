import React from 'react';

const ServiceCard = ({ title, description, icon }) => (
  <div className="bg-[rgba(255,51,102,0.1)] backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-[rgba(255,51,102,0.2)] border border-[rgba(255,51,102,0.3)]">
    <div className="h-48 bg-gradient-to-br from-[rgba(255,51,102,0.2)] to-[rgba(153,51,255,0.2)] flex items-center justify-center text-white">
      <span className="text-street transform transition-transform duration-300 hover:scale-110">{icon}</span>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-tag text-white mb-2 text-shadow">{title}</h3>
      <p className="font-street text-gray-300">{description}</p>
    </div>
  </div>
);

const ServiceSection = ({ title, services }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-tag text-white mb-6 text-shadow">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </div>
  </div>
);

const Tools = () => {
  const codeServices = [
    {
      title: "CodeShot",
      description: "Generate beautiful, customizable code screenshots for documentation and sharing.",
      icon: "(Coming Early Jan. 2025)"
    }
  ];

  const contentServices = [
    {
      title: "MetaScope",
      description: "Extract rich metadata from URLs for enhanced content previews.",
      icon: "(Coming Late Jan. 2025)"
    },
    {
      title: "SEO Analysis ",
      description: "Comprehensive SEO analysis and recommendations for content.",
      icon: "(Coming Late Feb. 2025)"
    }
  ];

  const assetServices = [
    {
      title: "PerfMetrics",
      description: "Track and analyze asset performance metrics for optimization.",
      icon: "(Coming Early Mar. 2025)"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-tag text-white mb-4 text-shadow">Fragment DevKit API</h1>
          <p className="text-xl font-street text-gray-300">
            Powerful tools and services for modern web development
          </p>
        </div>

        <ServiceSection title="Code Services" services={codeServices} />
        <ServiceSection title="Content Services" services={contentServices} />
        <ServiceSection title="Asset Services" services={assetServices} />
      </div>
    </div>
  );
};

export default Tools;
