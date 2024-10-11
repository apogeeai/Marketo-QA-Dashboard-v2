import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface SignOffSectionProps {
  onApprove: () => void;
}

const SignOffSection: React.FC<SignOffSectionProps> = ({ onApprove }) => {
  const [signature, setSignature] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signature && date) {
      onApprove();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Sign Off</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="signature" className="block text-sm font-medium text-gray-700">
            Signature
          </label>
          <input
            type="text"
            id="signature"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0143b4] focus:ring focus:ring-[#0143b4] focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0143b4] focus:ring focus:ring-[#0143b4] focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#ff672f] text-white py-2 px-4 rounded-md hover:bg-[#e55a29] focus:outline-none focus:ring-2 focus:ring-[#ff672f] focus:ring-opacity-50 flex items-center justify-center"
        >
          <CheckCircle className="mr-2" />
          Approve
        </button>
      </form>
    </div>
  );
};

export default SignOffSection;