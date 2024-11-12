import React from 'react';

const FindingDetails = ({ currentPage }) => {
  const findingsData = [
    {
      patientId: "123456789",
      diagnosis: "Sickle Cell Anemia",
      location: "Blood Smear",
      findings: "Sickle-shaped red blood cells, decreased oxygen saturation, and increased risk of vascular occlusion.",
    },
    {
      patientId: "987654321",
      diagnosis: "River Water",
      location: "Yamuna River View",
      findings: "Amount of pollutants in water",
    },
    {
      patientId: "555666777",
      diagnosis: "Lotus Pond Observation",
      location: "Lotus Pond",
      findings: "Two beautiful lotus flowers growing, a serene and calm water environment.",
    },
  ];

  const currentFinding = findingsData[currentPage] || {};

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Finding Details</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">ID</h3>
          <p>{currentFinding.patientId}</p>
        </div>
        <div>
          <h3 className="font-medium">Diagnosis</h3>
          <p>{currentFinding.diagnosis}</p>
        </div>
        <div>
          <h3 className="font-medium">Location</h3>
          <p>{currentFinding.location}</p>
        </div>
        <div>
          <h3 className="font-medium">Findings</h3>
          <p>{currentFinding.findings}</p>
        </div>
      </div>
    </div>
  );
};

export default FindingDetails;
