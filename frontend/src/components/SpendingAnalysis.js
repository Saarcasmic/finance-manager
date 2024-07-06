import React, { useState, useEffect } from 'react';
import { getSpendingAnalysis } from '../services/api';

const SpendingAnalysis = () => {
  const [analysis, setAnalysis] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAnalysis = async () => {
      const result = await getSpendingAnalysis(token);
      setAnalysis(result);
    };
    fetchAnalysis();
  }, [token]);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl">Spending Analysis</h2>
      {analysis ? (
        <div className="mt-4">
          <h3 className="text-xl">Cluster Centers</h3>
          <pre>{JSON.stringify(analysis.cluster_centers, null, 2)}</pre>
          <h3 className="text-xl">Clusters</h3>
          <pre>{JSON.stringify(analysis.clusters, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SpendingAnalysis;
