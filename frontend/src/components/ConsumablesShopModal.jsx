import React, { useState, useEffect, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { FaceSmileIcon, SparklesIcon, CakeIcon } from '@heroicons/react/24/outline';
import cx from 'clsx'
import { getShopConsumables, buyConsumable } from '../api';
import { FishIcon } from '../icons/FishIcon';

const Consumable = ({ consumable, isSelected, onClick }) => {
  return (
    <div onClick={onClick} className={cx('cursor-pointer flex space-x-2 items-center w-full bg-gray-100 rounded-lg hover:bg-gray-200 border-solid border-2', isSelected ? 'border-blue-500' : 'border-gray-100 hover:border-gray-200')}>
      <div className='flex justify-center items-center bg-gray-200 rounded-lg p-2'>
        {consumable.type === 'happiness' && (
          <FaceSmileIcon className='w-12 h-12 text-gray-600' />
        )}
        {consumable.type === 'cleanliness' && (
          <SparklesIcon className='w-12 h-12 text-gray-600' />
        )}
        {consumable.type === 'hunger' && (
          <CakeIcon className='w-12 h-12 text-gray-600' />
        )}
      </div>
      <span className='text-gray-900 text-lg'>
        {`Ціна: ${consumable.price}, покращення: +${Math.round(consumable.buff * 100)}%`}
      </span>
    </div>
  )
}

export const ConsumablesShopModal = ({ isOpen, close, onAction }) => {
  const [consumables, setConsumables] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setLoading(true)

    getShopConsumables()
      .then(setConsumables)
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
      alert('Будь ласка, виберіть товар який ви хочете купити')
      return
    }

    try {
      await buyConsumable(selectedId)
    } catch (reason) {
      console.error('[buyConsumable]:', reason)
      alert(reason)
      return
    }

    onAction()
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
                    Магазин товарів
                  </Dialog.Title>
                  {loading ? (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Завантаження..
                      </p>
                    </div>
                  ) : (
                    <div className="mt-2 space-y-4">
                      {consumables?.length > 0 && consumables.map((consumable) => (
                        <Consumable
                          consumable={consumable}
                          key={consumable.id}
                          isSelected={selectedId === consumable.id} 
                          onClick={() => {
                            setSelectedId(consumable.id)
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onBuy}
                    >
                      Купити товар
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
