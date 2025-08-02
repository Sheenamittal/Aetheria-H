'use client';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    population: 10000,
    radius: 0.01,
    probability: 0.05,
  });

  const runSimulation = async () => {
    setLoading(true);
    setData([]);
    const url = `http://127.0.0.1:8000/run_simulation?population=${params.population}&radius=${params.radius}&probability=${params.probability}`;
    try {
      const response = await fetch(url);
      const results = await response.json();
      setData(results);
    } catch (error) {
      console.error("Failed to run simulation:", error);
      alert("Failed to connect to the backend. Is the Python server running?");
    }
    setLoading(false);
  };

  const handleParamChange = (e) => {
    setParams({ ...params, [e.target.name]: parseFloat(e.target.value) });
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Aetheria-H: Epidemic Simulator</h1>
      <p className="mb-8">A full-stack agent-based model control panel.</p>

      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <label htmlFor="population" className="block text-sm font-medium">Population</label>
          <input type="range" id="population" name="population" min="1000" max="50000" step="1000" value={params.population} onChange={handleParamChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
          <div className="text-center mt-1">{params.population.toLocaleString()}</div>
        </div>
        <div>
          <label htmlFor="radius" className="block text-sm font-medium">Infection Radius</label>
          <input type="range" id="radius" name="radius" min="0.001" max="0.05" step="0.001" value={params.radius} onChange={handleParamChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
          <div className="text-center mt-1">{params.radius.toFixed(3)}</div>
        </div>
        <div>
          <label htmlFor="probability" className="block text-sm font-medium">Infection Probability</label>
          <input type="range" id="probability" name="probability" min="0.01" max="1.0" step="0.01" value={params.probability} onChange={handleParamChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
          <div className="text-center mt-1">{(params.probability * 100).toFixed(0)}%</div>
        </div>
      </div>

      <button onClick={runSimulation} disabled={loading} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-500">
        {loading ? 'Simulating...' : 'Run Simulation'}
      </button>

      <div className="w-full max-w-5xl h-96 mt-8 bg-gray-800 p-4 rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="day" stroke="#E2E8F0" />
            <YAxis stroke="#E2E8F0" />
            <Tooltip contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568' }} />
            <Legend />
            <Line type="monotone" dataKey="S" stroke="#3B82F6" strokeWidth={2} dot={false} name="Susceptible" />
            <Line type="monotone" dataKey="I" stroke="#EF4444" strokeWidth={2} dot={false} name="Infected" />
            <Line type="monotone" dataKey="R" stroke="#22C55E" strokeWidth={2} dot={false} name="Recovered" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}








