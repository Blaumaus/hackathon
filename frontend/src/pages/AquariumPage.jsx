import React, { useState } from 'react';
import InviteModal from '../components/InviteModal';
import StatusBar from '../components/StatusBar';
import { Widget } from '../components/RobotWidget';

const AquariumPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInviteClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="p-8 mb-">
        <div className="flex flex-row space-x-8">
        <StatusBar name="Чистота" color="bg-blue-500" percentage={10} />
        <StatusBar name="Голод" color="bg-yellow-500" percentage={75} />
        <StatusBar name="Щастя" color="bg-green-500" percentage={90} />
      </div>
        <div className="bg-blue-200 p-4">
          Акваріум
        </div>
        <button className="btn btn-primary absolute top-5 right-5" onClick={handleInviteClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
        </button>
      </div>
      
      <Widget />
      {isModalOpen && <InviteModal onClose={closeModal} />}
    </div>
  );
};

export default AquariumPage;
