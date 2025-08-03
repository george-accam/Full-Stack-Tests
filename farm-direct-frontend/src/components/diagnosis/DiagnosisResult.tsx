import React from 'react';
import { AlertTriangle, CheckCircle, Leaf, ArrowRight } from 'lucide-react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import { DiagnosisResult as DiagnosisResultType } from '../../types';

interface DiagnosisResultProps {
  result: DiagnosisResultType;
}

const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ result }) => {
  const getSeverityColor = () => {
    switch (result.severity) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getSeverityIcon = () => {
    switch (result.severity) {
      case 'low':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Leaf className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-green-50">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Diagnosis Results</h3>
          <Badge variant={getSeverityColor()}>
            {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} Severity
          </Badge>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">Crop:</span> {result.cropName}
          <span className="mx-2">•</span>
          <span className="font-medium mr-2">Condition:</span> {result.condition}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <div className="flex items-start">
            {getSeverityIcon()}
            <div className="ml-3">
              <h4 className="text-md font-medium text-gray-800">Diagnosis</h4>
              <p className="text-gray-600 mt-1">{result.diagnosis}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-md font-medium text-gray-800 mb-2">Recommendations</h4>
          <ul className="space-y-2">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <ArrowRight className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-600">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-4 pt-4 border-t text-sm text-gray-500">
          Diagnosis generated on {new Date(result.createdAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagnosisResult;