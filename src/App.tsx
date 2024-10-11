import React, { useState } from 'react';
import { CheckCircle, ClipboardCheck, Plus, Minus } from 'lucide-react';
import ChecklistSection from './components/ChecklistSection';
import SignOffSection from './components/SignOffSection';

const App: React.FC = () => {
  const [isApproved, setIsApproved] = useState(false);
  const [emailSections, setEmailSections] = useState([1]);

  const handleApprove = () => {
    setIsApproved(true);
    setTimeout(() => setIsApproved(false), 3000);
  };

  const addEmailSection = () => {
    setEmailSections([...emailSections, emailSections.length + 1]);
  };

  const removeEmailSection = () => {
    if (emailSections.length > 1) {
      const newEmailSections = emailSections.slice(0, -1);
      setEmailSections(newEmailSections);
    }
  };

  const checklistData = {
    'Program & Campaigns': [
      'Program name follows naming conventions',
      'Program is filed in the correct folder',
      'Program type is correctly specified',
      'Program URL is correct and accessible',
      'Send counts align with reported counts',
    ],
    'Email': [
      'From Name is correct',
      'From Address is accurate',
      'Reply-to address is set correctly',
      'Subject line is relevant and correct',
      'Preheader text is accurate and aligned with content',
      'Tokens are included or correct information is present',
    ],
    'Lists': [
      'List count matches the reported count',
      'List upload template was used (if applicable)',
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold flex items-center">
            <ClipboardCheck className="mr-2" />
            Marketo QA Checklist Dashboard
          </h1>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4 flex-grow">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <ChecklistSection
            title="Program & Campaigns"
            items={checklistData['Program & Campaigns']}
          />
          {emailSections.map((num) => (
            <ChecklistSection
              key={num}
              title={`Email ${num}`}
              items={checklistData['Email']}
            />
          ))}
          <div className="p-4 bg-gray-50 flex space-x-4">
            <button
              onClick={addEmailSection}
              className="flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="mr-2" size={16} />
              Add Email
            </button>
            {emailSections.length > 1 && (
              <button
                onClick={removeEmailSection}
                className="flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Minus className="mr-2" size={16} />
                Remove Email
              </button>
            )}
          </div>
          <ChecklistSection
            title="Lists"
            items={checklistData['Lists']}
          />
          <SignOffSection onApprove={handleApprove} />
        </div>
      </main>
      <footer className="bg-gray-200 p-4 text-center">
        <p className="text-sm text-gray-600">
          &copy; 2024 Your Company. All rights reserved.
        </p>
      </footer>
      {isApproved && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center">
          <CheckCircle className="mr-2" />
          QA Checklist Approved!
        </div>
      )}
    </div>
  );
};

export default App;