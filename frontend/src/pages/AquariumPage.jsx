import React, { useState, useEffect, useRef, useContext } from 'react';
import InviteModal from '../components/InviteModal';
import StatusBar from '../components/StatusBar';
import { UserContext } from '../context/userContext'
import cx from 'clsx'
import { Widget } from '../components/RobotWidget';
import { GiftIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import { FishIcon } from '../icons/FishIcon';
import { auth, withAuthentication } from '../hoc/protected';
import { getAquariumStats } from '../api';
import _map from 'lodash/map';

import { FishShopModal } from '../components/FishShopModal';
import { ConsumablesShopModal } from '../components/ConsumablesShopModal';

const Fish = ({ fish, colour, yShift, xDelta, dead }) => {
  const [xPosition, setXPosition] = useState(3 + xDelta);
  const xDirection = useRef(1);
  const [yPosition, setYPosition] = useState(dead ? -5 : 5);
  const yDirection = useRef(1);
  const requestId = useRef(null);
  const xSpeed = 0.5 * fish.speedMultiplier;
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
  const { user } = useContext(UserContext)
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
  const [isConsumablesShopOpen, setIsConsumablesShopOpen] = useState(false);

  const handleInviteClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-no-repeat bg-cover" style={{ backgroundImage: 'url("/assets/table-2.jpg")' }}>
      <div className="absolute top-4 left-4 bg-purple-500 bg-opacity-40 shadow-2xl p-4 rounded-lg z-10">
        <div className="flex flex-col space-y-2 text-gray-200">
          <StatusBar name="Чистота" color="bg-blue-500" percentage={auqriumStats.cleanliness * 100} />
          <StatusBar name="Голод" color="bg-yellow-500" percentage={auqriumStats.hunger * 100} />
          <StatusBar name="Щастя" color="bg-green-500" percentage={auqriumStats.happiness * 100} />
          <div className="flex items-center space-x-4 text-gray-50">
            <BanknotesIcon className='w-6 h-6' />
            <span>
              {`Гроші: ${user?.money || 'N/A'}`}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <button className="btn btn-primary shadow-lg hover:shadow-xl transition-shadow duration-300" onClick={handleInviteClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
        </button>
      </div>
      <div className="flex-grow w-full max-w-5xl mt-80 px-4">
        <div className='flex items-end h-[480px] border-4 rounded-t-xl border-solid border-slate-800 rounded-lg overflow-hidden'>
            <div className="w-full h-3/4 animate-aquarium relative  bg-blue-300">
              {_map(fishes, (fish, index) => (
                <Fish
                  key={fish.id}
                  fish={fish}
                  colour={fish.colour}
                  yShift={(index + 40) * fish.speedMultiplier}
                  xDelta={index + 5}
                  dead={fish.isDead}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-4 top-5 right-5">
        <button className="btn btn-primary" onClick={() => setIsFishShopOpen(true)}>
          <FishIcon
            className='w-12 h-12'
            colour='red'
          />
          Магазин риб
        </button>
        <button className="btn btn-primary" onClick={() => setIsConsumablesShopOpen(true)}>
          <GiftIcon
            className='w-12 h-12'
            colour='text-red-600'
          />
          Магазин товарів
        </button>
      </div>

      <Widget />
      <FishShopModal
        close={() => setIsFishShopOpen(false)}
        isOpen={isFishShopOpen}
        fishes={fishes} 
        onAction={async () => {
          return getAquariumStats()
            .then((response) => {
              setAuqriumStats(response.aquariumStatus);
              setFishes(response.fishes);
            })
            .catch((error) => {
              console.error(error);
            })
        }}
      />
      <ConsumablesShopModal
        close={() => setIsConsumablesShopOpen(false)}
        isOpen={isConsumablesShopOpen}
        onAction={async () => {
          return getAquariumStats()
            .then((response) => {
              setAuqriumStats(response.aquariumStatus);
              setFishes(response.fishes);
            })
            .catch((error) => {
              console.error(error);
            })
        }}
      />
      {isModalOpen && <InviteModal onClose={closeModal} />}
    </div>
  );
};

export default withAuthentication(AquariumPage, auth.authenticated);
// export default AquariumPage
