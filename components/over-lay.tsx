import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

type Props={
    isVisible:boolean
    children:ReactNode
}
const Overlay = ({ isVisible, children }:Props) => {
  return (
    isVisible && (
      <div className={cn("fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50")}>
        <div className="bg-white p-4 rounded">
          {children}
        </div>
      </div>
    )
  );
};

export default Overlay;
