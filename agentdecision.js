import React, { useState } from 'react';
import { Scatter } from 'recharts';
import { ScatterChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';

const AutomationDecisionChart = () => {
  const [selectedScenario, setSelectedScenario] = useState(null);

  const scenarios = [
    // Traditional Automation Zone (Low complexity, low dynamics)
    { x: 1, y: 1, category: 'Traditional', name: 'Email auto-forwarding', description: 'Simple rule-based email routing', solution: 'Workflow Automation' },
    { x: 1.5, y: 1, category: 'Traditional', name: 'Invoice processing', description: 'OCR + validation + routing', solution: 'RPA' },
    { x: 2, y: 1.5, category: 'Traditional', name: 'Inventory restocking', description: 'Threshold-based reordering', solution: 'ERP Automation' },
    { x: 1, y: 2, category: 'Traditional', name: 'Report generation', description: 'Scheduled data extraction & formatting', solution: 'Workflow Automation' },
    
    // AI Agent Sweet Spot (Moderate complexity, moderate dynamics)
    { x: 3, y: 3, category: 'AI Agent', name: 'Network diagnostics', description: 'Multi-system fault correlation & analysis', solution: 'AI Agent' },
    { x: 3.5, y: 3.5, category: 'AI Agent', name: 'Travel booking', description: 'Multi-constraint optimization with preferences', solution: 'AI Agent' },
    { x: 4, y: 3, category: 'AI Agent', name: 'Customer service', description: 'Context-aware support with escalation', solution: 'AI Agent' },
    { x: 3, y: 4, category: 'AI Agent', name: 'Content creation', description: 'Research + synthesis + personalization', solution: 'AI Agent' },
    { x: 4, y: 4, category: 'AI Agent', name: 'Supply chain optimization', description: 'Dynamic disruption response', solution: 'Multi-Agent System' },
    { x: 3.5, y: 4.5, category: 'AI Agent', name: 'Software debugging', description: 'Code analysis + fix suggestions', solution: 'AI Agent' },
    
    // Too Complex Zone (High complexity, high dynamics)
    { x: 5, y: 5, category: 'TooComplex', name: 'Autonomous surgery', description: 'Life-critical medical procedures', solution: 'Human Required' },
    { x: 4.5, y: 5, category: 'TooComplex', name: 'Crisis management', description: 'High-stakes strategic decisions', solution: 'Human + AI Support' },
    { x: 5, y: 4.5, category: 'TooComplex', name: 'Legal strategy', description: 'Complex litigation planning', solution: 'Human Required' },
    { x: 4.8, y: 4.8, category: 'TooComplex', name: 'Nuclear plant control', description: 'Safety-critical industrial control', solution: 'Human Required' },
    
    // Edge cases
    { x: 2.5, y: 2, category: 'Traditional', name: 'Basic chatbot', description: 'FAQ responses with simple NLP', solution: 'Traditional AI' },
    { x: 2, y: 3, category: 'AI Agent', name: 'Fraud detection', description: 'Pattern recognition + adaptive rules', solution: 'AI Agent' },
  ];

  const getColor = (category) => {
    switch(category) {
      case 'Traditional': return '#94a3b8';
      case 'AI Agent': return '#3b82f6';
      case 'TooComplex': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getBgColor = (category) => {
    switch(category) {
      case 'Traditional': return '#f1f5f9';
      case 'AI Agent': return '#dbeafe';
      case 'TooComplex': return '#fee2e2';
      default: return '#f9fafb';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          AI Agent Decision Chart: When to Use Different Automation Approaches
        </h1>
        <p className="text-gray-700 text-lg">
          Click on any scenario to see detailed recommendations. The chart shows the "sweet spot" where AI agents provide the most value.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 p-4 rounded-lg">
            <ResponsiveContainer width="100%" height={500}>
              <ScatterChart margin={{ top: 20, right: 30, bottom: 60, left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  domain={[0, 5.5]} 
                  label={{ value: 'Complexity of Environment & Goals', position: 'insideBottom', offset: -40 }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  domain={[0, 5.5]} 
                  label={{ value: 'Dynamics & Variability', angle: -90, position: 'insideLeft' }}
                  tick={{ fontSize: 12 }}
                />
                
                {/* Background zones */}
                <ReferenceArea x1={0} x2={2.5} y1={0} y2={2.5} fill="#f1f5f9" fillOpacity={0.3} />
                <ReferenceArea x1={2.5} x2={4.5} y1={2.5} y2={4.5} fill="#dbeafe" fillOpacity={0.4} />
                <ReferenceArea x1={4.5} x2={5.5} y1={4.5} y2={5.5} fill="#fee2e2" fillOpacity={0.3} />
                
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload[0]) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg max-w-64">
                          <p className="font-semibold text-gray-900">{data.name}</p>
                          <p className="text-sm text-gray-600 mt-1">{data.description}</p>
                          <p className="text-sm font-medium mt-2 text-blue-600">→ {data.solution}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                
                <Scatter 
                  data={scenarios} 
                  fill={(entry) => getColor(entry.category)}
                />
                
                {scenarios.map((scenario, index) => (
                  <Scatter
                    key={index}
                    data={[scenario]}
                    fill={getColor(scenario.category)}
                    onClick={() => setSelectedScenario(scenario)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
            
            {/* Zone labels */}
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-slate-100 rounded">
                <div className="font-semibold text-slate-700">Traditional Automation Zone</div>
                <div className="text-slate-600">Low complexity, stable environments</div>
              </div>
              <div className="text-center p-3 bg-blue-100 rounded">
                <div className="font-semibold text-blue-700">AI Agent Sweet Spot</div>
                <div className="text-blue-600">Moderate complexity, dynamic needs</div>
              </div>
              <div className="text-center p-3 bg-red-100 rounded">
                <div className="font-semibold text-red-700">Too Complex Zone</div>
                <div className="text-red-600">Human expertise required</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario Details */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Scenario Details</h3>
            {selectedScenario ? (
              <div className={`p-4 rounded-lg ${getBgColor(selectedScenario.category)}`}>
                <h4 className="font-semibold text-gray-900 mb-2">{selectedScenario.name}</h4>
                <p className="text-gray-700 mb-3">{selectedScenario.description}</p>
                <div className="border-t pt-3">
                  <p className="text-sm font-medium text-gray-600">Recommended Solution:</p>
                  <p className="text-lg font-semibold" style={{color: getColor(selectedScenario.category)}}>
                    {selectedScenario.solution}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 italic">Click on any scenario in the chart to see detailed recommendations.</p>
            )}
          </div>

          {/* Decision Criteria */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Decision Criteria</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-slate-700">Traditional Automation</span>
                <ul className="mt-1 text-gray-600 ml-4 list-disc">
                  <li>Stable, structured environment</li>
                  <li>Well-defined, static goals</li>
                  <li>Routine, predictable execution</li>
                </ul>
              </div>
              
              <div>
                <span className="font-medium text-blue-700">AI Agents</span>
                <ul className="mt-1 text-gray-600 ml-4 list-disc">
                  <li>Dynamic environments</li>
                  <li>Complex decision-making</li>
                  <li>Adaptive responses needed</li>
                  <li>Cross-system integration</li>
                </ul>
              </div>
              
              <div>
                <span className="font-medium text-red-700">Human Required</span>
                <ul className="mt-1 text-gray-600 ml-4 list-disc">
                  <li>Life-critical decisions</li>
                  <li>High-stakes scenarios</li>
                  <li>Creative/empathy needs</li>
                  <li>Perfect reliability required</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Chart Legend</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-slate-400 mr-3"></div>
                <span className="text-sm">Traditional Automation</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-3"></div>
                <span className="text-sm">AI Agent Suitable</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-500 mr-3"></div>
                <span className="text-sm">Too Complex for Current AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">The Sweet Spot</h3>
          <p className="text-blue-800">
            AI agents excel in scenarios with moderate complexity that require adaptive responses to changing conditions - 
            like network diagnostics, customer service, and dynamic scheduling.
          </p>
        </div>
        
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">Cost Considerations</h3>
          <p className="text-amber-800">
            Traditional automation is often more cost-effective for simple, repetitive tasks. 
            AI agents justify their cost when complexity savings outweigh operational expenses.
          </p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-3">Future Evolution</h3>
          <p className="text-green-800">
            As AI agents become more capable and cost-effective, the sweet spot will expand, 
            enabling automation of increasingly complex business scenarios.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AutomationDecisionChart;