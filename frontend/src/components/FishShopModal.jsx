import React, { useState, useEffect, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import cx from 'clsx'
import { getShopFish, buyFish } from '../api';
import { FishIcon } from '../icons/FishIcon';

const Fish = ({ fish, isSelected, onClick }) => {
  return (
    <div onClick={onClick} className={cx('cursor-pointer flex space-x-2 items-center w-full bg-gray-100 rounded-lg hover:bg-gray-200 border-solid border-2', isSelected ? 'border-blue-500' : 'border-gray-100 hover:border-gray-200')}>
      <div className='flex justify-center items-center bg-gray-200 rounded-lg p-2'>
        <FishIcon
          className='w-12 h-12'
          colour={fish.colour}
          type={fish.type}
        />
      </div>
      <span className='text-gray-900 text-lg'>
        {`Ціна: ${fish.price}`}
      </span>
    </div>
  )
}

export const FishShopModal = ({ isOpen, close }) => {
  const [fish, setFish] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setLoading(true)

    getShopFish()
      .then((apiFish) => {
        setFish(apiFish)
      })
      .catch((reason) => {
        console.error('getShopFish:', reason)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [isOpen])

  const _close = () => {
    setSelectedId(null)
    close()
  }

  const onBuy = async () => {
    if (!selectedId) {
      alert('Будь ласка, виберіть рибу яку ви хочете купити')
      return
    }

    try {
      await buyFish(selectedId)
    } catch (reason) {
      console.error('[buyFish]:', reason)
      alert(reason)
      return
    }

    _close()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={_close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Магазин риб
                  </Dialog.Title>
                  {loading ? (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Завантаження..
                      </p>
                    </div>
                  ) : (
                    <div className="mt-2 space-y-4">
                      {fish?.length > 0 ? fish.map((_fish) => (
                        <Fish
                          fish={_fish}
                          key={_fish.id}
                          isSelected={selectedId === _fish.id} 
                          onClick={() => {
                            setSelectedId(_fish.id)
                          }}
                        />
                      )) : (
                        <span className='text-gray-900'>
                          Поки що немає риби на продаж...
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onBuy}
                    >
                      Купити рибку :)
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}