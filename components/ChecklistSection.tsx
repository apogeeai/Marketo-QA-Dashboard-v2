import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface ChecklistSectionProps {
  title: string;
  items: string[];
}

const ChecklistSection: React.FC<ChecklistSectionProps> = ({ title, items }) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(items.length).fill(false));

  const handleCheckItem = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <h2 className="text-lg font-semibold p-4">{title}</h2>
      <ul className="p-4 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center checklist-item">
            <button
              className={`w-6 h-6 rounded-full border-2 mr-2 flex items-center justify-center ${
                checkedItems[index] ? 'bg-green-500 border-green-500' : 'border-gray-300'
              }`}
              onClick={() => handleCheckItem(index)}
            >
              {checkedItems[index] && <Check className="text-white" size={16} />}
            </button>
            <span className={`transition-all duration-300 ${checkedItems[index] ? 'line-through text-gray-500' : ''}`}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChecklistSection;