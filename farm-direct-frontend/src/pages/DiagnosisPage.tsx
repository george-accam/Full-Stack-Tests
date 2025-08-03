import React, { useState } from 'react';
import { Leaf, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DiagnosisForm from '../components/diagnosis/DiagnosisForm';
import DiagnosisResult from '../components/diagnosis/DiagnosisResult';
import { diagnosisResults } from '../data/mockData';
import Card, { CardHeader, CardContent } from '../components/ui/Card';

const DiagnosisPage: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState(diagnosisResults[0]);
  const [showResult, setShowResult] = useState(false);
  
  const handleSubmitDiagnosis = (data: { cropName: string; description: string; imageUrl: string }) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setCurrentResult({
        ...diagnosisResults[0],
        cropName: data.cropName,
        createdAt: new Date().toISOString(),
      });
      setShowResult(true);
      setIsLoading(false);
    }, 2000);
  };

  if (!user || user.role !== 'farmer') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h2>
        <p className="text-gray-600 mb-6">
          The AI Diagnosis tool is only available to registered farmers.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Crop Diagnosis</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Upload a photo of your crop or describe its symptoms to get instant AI-powered diagnosis and treatment recommendations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {!showResult ? (
            <DiagnosisForm onSubmit={handleSubmitDiagnosis} isLoading={isLoading} />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Diagnosis Complete</h3>
              <p className="text-gray-600 mb-6">
                Our AI has analyzed your crop and provided a diagnosis. You can view the results on the right.
              </p>
              <button
                onClick={() => setShowResult(false)}
                className="text-green-600 hover:text-green-800 font-medium flex items-center"
              >
                Start New Diagnosis
                <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          )}
          
          <div className="mt-8">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Leaf className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">How It Works</h3>
                </div>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold mr-3">
                      1
                    </span>
                    <div>
                      <h4 className="font-medium text-gray-900">Upload or Describe</h4>
                      <p className="text-gray-600">
                        Upload a clear photo of the affected crop or describe the symptoms in detail.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold mr-3">
                      2
                    </span>
                    <div>
                      <h4 className="font-medium text-gray-900">AI Analysis</h4>
                      <p className="text-gray-600">
                        Our advanced AI analyzes the image or description to identify diseases, pests, or nutrient deficiencies.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold mr-3">
                      3
                    </span>
                    <div>
                      <h4 className="font-medium text-gray-900">Get Results</h4>
                      <p className="text-gray-600">
                        Receive a detailed diagnosis with treatment recommendations and preventive measures.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold mr-3">
                      4
                    </span>
                    <div>
                      <h4 className="font-medium text-gray-900">Take Action</h4>
                      <p className="text-gray-600">
                        Apply the recommended treatments to protect your crops and improve yields.
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          {showResult ? (
            <DiagnosisResult result={currentResult} />
          ) : (
            <div className="bg-green-50 p-8 rounded-lg shadow-md h-full flex flex-col items-center justify-center text-center">
              <Leaf className="h-16 w-16 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Your Diagnosis Results Will Appear Here
              </h3>
              <p className="text-gray-600">
                Submit a crop image or description to receive AI-powered diagnosis and treatment recommendations.
              </p>
            </div>
          )}
          
          <div className="mt-8">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-800">Previous Diagnoses</h3>
              </CardHeader>
              <CardContent>
                {diagnosisResults.length > 0 ? (
                  <div className="space-y-4">
                    {diagnosisResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-start p-3 rounded-md hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setCurrentResult(result);
                          setShowResult(true);
                        }}
                      >
                        <div className="flex-shrink-0 mr-3">
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            ${
                              result.severity === 'low'
                                ? 'bg-emerald-100 text-emerald-800'
                                : result.severity === 'medium'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                            }
                          `}>
                            <Leaf className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium text-gray-800">
                              {result.cropName} - {result.condition}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {new Date(result.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {result.diagnosis.substring(0, 100)}...
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No previous diagnoses found.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisPage;