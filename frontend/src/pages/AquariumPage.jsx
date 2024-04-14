import React, { useState, useEffect, useRef } from 'react';
import InviteModal from '../components/InviteModal';
import StatusBar from '../components/StatusBar';
import cx from 'clsx'
import { Widget } from '../components/RobotWidget';
import { FishIcon } from '../icons/FishIcon';
import { auth, withAuthentication } from '../hoc/protected';
import { getAquariumStats } from '../api';
import _map from 'lodash/map';

import { FishShopModal } from '../components/FishShopModal';

const Fish = ({ fish, colour, yShift, xDelta, dead }) => {
  const [xPosition, setXPosition] = useState(3 + xDelta);
  const xDirection = useRef(1);
  const [yPosition, setYPosition] = useState(dead ? -5 : 5);
  const yDirection = useRef(1);
  const requestId = useRef(null);
  const xSpeed = 0.5;
  const ySpeed = 0.2;

  useEffect(() => {
    const animationLoop = () => {
      if (dead) {
        setYPosition(prevPosition => {
          if (prevPosition >= -5) {
            yDirection.current = -1;
          }
  
          if (prevPosition <= -8) {
            yDirection.current = 1;
          }
  
          return prevPosition + yDirection.current * 0.05
        });
      } else {
        setXPosition(prevPosition => {
          if (prevPosition >= 90) {
            xDirection.current = -1;
          }
  
          if (prevPosition <= 3) {
            xDirection.current = 1;
          }
  
          return prevPosition + xDirection.current * xSpeed
        });
  
        setYPosition(prevPosition => {
          if (prevPosition >= 20) {
            yDirection.current = -1;
          }
  
          if (prevPosition <= 5) {
            yDirection.current = 1;
          }
  
          return prevPosition + yDirection.current * ySpeed
        });
      }

      requestId.current = requestAnimationFrame(animationLoop);
    };

    requestId.current = requestAnimationFrame(animationLoop);

    return () => cancelAnimationFrame(requestId.current);
  }, [xSpeed, dead]);

  const rotate = yDirection.current === 1
    ? xDirection.current === 1
      ? 'rotate-6'
      : '-rotate-6'
    : xDirection.current === 1
      ? '-rotate-6'
      : 'rotate-6'

  return (
    <FishIcon
      type={fish.type}
      className={cx(
        'w-12 h-12 absolute',
        xDirection.current === -1 && 'scale-x-[-1]',
        dead && 'scale-y-[-1]',
        !dead && rotate,
      )}
      dead={dead}
      style={{
        left: `${xPosition}%`,
        top: `${dead ? yPosition : yPosition + yShift}%`,
      }}
      colour={colour}
    />
  )
};

const AquariumPage = () => {
  const [auqriumStats, setAuqriumStats] = useState({
    cleanliness: 0,
    happiness: 0,
    hunger: 0,
  });
  const [fishes, setFishes] = useState([]);

  useEffect(() => {
    getAquariumStats()
      .then((response) => {
        setAuqriumStats(response.aquariumStatus);
        setFishes(response.fishes);
      })
      .catch((error) => {
        console.error(error);
      });
    setInterval(() => {
      getAquariumStats()
        .then((response) => {
          setAuqriumStats(response.aquariumStatus);
          setFishes(response.fishes);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 5000)
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFishShopOpen, setIsFishShopOpen] = useState(false);

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
        <div className='flex items-end h-72 border border-solid border-slate-800 mt-6'>
          <div className="w-full h-5/6 bg-blue-300 animate-pulse opacity-60 relative">
            {_map(fishes,(fish) => (
              <Fish
                key={fish.id}
                fish={fish}
                colour={fish.colour}
                yShift={fish.speedMultiplier / 2}
                xDelta={fish.speedMultiplier}
                dead={fish.isDead}
              />
            ))}
          </div>
        </div>
        <button className="btn btn-primary absolute top-5 right-5" onClick={handleInviteClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
        </button>
        <button className="btn btn-primary top-5 right-5" onClick={() => setIsFishShopOpen(true)}>
          <FishIcon
            className='w-12 h-12'
            colour='red'
          />
          Магазин риб
        </button>
      </div>

      <Widget />
      <FishShopModal close={() => setIsFishShopOpen(false)} isOpen={isFishShopOpen} />
      {isModalOpen && <InviteModal onClose={closeModal} />}
    </div>
  );
};

export default withAuthentication(AquariumPage, auth.authenticated);
// export default AquariumPage
