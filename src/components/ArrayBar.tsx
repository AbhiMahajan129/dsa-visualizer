import React from "react";


interface ArrayBarProps {
  array: number[];
  color: string;
}

const ArrayBar: React.FC<ArrayBarProps> = ({ array, color }) => {
  return (
    <div className="flex">
      {array.map((num, idx) => (
        
          <div
            key={idx}
            className="
              w-[60px] h-[60px]
              border-2 
              flex items-center justify-center
              margin-[20px]
            "
            style={{ borderColor: color, borderRadius: '10px' }}
          >
            <div className="font-bold">{num}</div>
          </div>
        
      ))}
    </div>
  );
};

export default ArrayBar;

