import React, { useRef, useState } from 'react';
import FindingDetails from './FindingDetails';
import ImageViewer from './ImageViewer';

const WholeSlideViewer = () => {
  const hubViewerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);  // Track the current image index

  return (
    <div className="flex h-screen">
      {/* FindingDetails panel */}
      <div className="bg-gray-100 p-6 w-1/4 mr-4 border-r">
        <FindingDetails currentPage={currentPage} />
      </div>

      {/* Main image viewer, occupying 3/4 of the screen */}
      <div className="flex-grow">
        <ImageViewer hubViewerRef={hubViewerRef} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default WholeSlideViewer;
