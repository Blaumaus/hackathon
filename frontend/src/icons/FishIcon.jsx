import React from 'react'

const FISH_COLOUR_MAP = {
  red: 'fill-red-600',
  green: 'fill-green-600',
  blue: 'fill-blue-600',
  purple: 'fill-purple-600',
  yellow: 'fill-yellow-600',
  orange: 'fill-orange-600',
  cyan: 'fill-cyan-600',
  emerald: 'fill-emerald-600',
}

const FISH_COLOUR_HEAD_MAP = {
  red: 'fill-red-400',
  green: 'fill-green-400',
  blue: 'fill-blue-400',
  purple: 'fill-purple-400',
  yellow: 'fill-yellow-400',
  orange: 'fill-orange-400',
  cyan: 'fill-cyan-400',
  emerald: 'fill-emerald-400',
}

export const FishIcon = ({ colour, className, style, dead }) => (
  <>
      <svg viewBox="0 0 256 256" className={className} style={style}>
        <path className={FISH_COLOUR_MAP[colour]} d="M110.2,59.1c-1.1,1.1-1.2,1.4-0.9,3.4c0.5,3.4,3.2,13.2,5.4,18.8c1,2.7,1.7,5.1,1.5,5.3c-0.2,0.1-2.4,1-5,1.8c-7.5,2.4-17.1,6.3-24.4,10c-6.6,3.2-19.9,10.9-22.6,13l-1.2,1l-3.6-3c-7-5.8-15.2-10.7-26.6-15.7c-8.2-3.6-17.8-7.1-19.4-7.1c-1.5,0-3.5,1.9-3.5,3.4c0,1.7,2.9,8.9,6.4,16.2c3.7,7.6,9.4,16.2,13.5,20.8l3,3.2l-3.5,4.2c-6.5,7.8-13,18.6-17.2,29.1c-2.4,5.8-2.5,6.9-1.2,8.3c1.6,1.8,2.7,1.7,9-0.6c16.7-6.1,31.8-14.1,39.5-20.9c1.4-1.3,2.7-2.4,2.9-2.4c0.1,0,2.9,1.8,6.1,3.9c10.1,6.6,19.9,11.6,32,16.3c2.9,1.2,5.4,2.1,5.4,2.2s-0.7,2.2-1.7,4.7c-2.3,5.7-5,15-5.4,18.4c-0.3,2.2-0.2,2.6,0.9,3.6c0.6,0.6,1.7,1.2,2.4,1.2c3.4,0,25.7-11.2,36.3-18.1l2.5-1.7l4.4,0.5c7.5,0.8,22,0.6,28.8-0.5c15.7-2.4,31.2-8.3,43.9-16.8c16.4-10.9,29.1-25.9,28.1-32.8c-0.7-4.3-7.5-14-14.8-20.8c-19.1-18-44.7-27.8-72.9-27.8c-3.4,0-4.3-0.1-5.1-0.9c-1.5-1.3-8.8-6.1-13.4-8.8c-8.6-5-25-12.5-27.3-12.5C111.9,57.9,110.9,58.5,110.2,59.1z M126.4,71.7c8.5,4.2,16.1,8.7,21.6,12.8l3.8,2.8l8.8,0.3c10.9,0.4,23.7,2.2,23.4,3.4c0,0.2-1,1.9-2,3.6c-3.9,6.4-6.9,14.4-8.5,22.6c-1.2,5.7-1.2,19,0,25c1.5,8,4.6,16.5,8.5,22.9c1.1,1.7,1.9,3.3,1.9,3.5c0,0.4-7.9,2.1-13.4,2.8c-5.2,0.7-17.7,0.6-25.5,0l-6.3-0.6l-5.7,3.7c-8.4,5.4-24.2,13.8-25.3,13.4c-0.5-0.2,2.8-9.5,5-14.6c2.8-6.3,2.6-7.7-1.4-9c-14.8-4.8-32.8-13.9-44.2-22.3c-5.2-3.8-5.5-3.8-10.3,0.6c-6.7,6.2-17.4,12.6-30.6,18.1c-3.1,1.3-5.8,2.4-5.9,2.4c-0.1,0,0.6-1.8,1.8-4.1c4.9-9.7,9.9-17.1,16.2-23.7c5.2-5.4,5.2-5.3-1.2-11.8c-3.1-3.1-6.1-6.6-7.9-9.4c-3.3-5-9.5-17.2-8.9-17.4c0.6-0.2,13.1,5.2,18.5,8.1c7.1,3.7,13.3,8,17.7,12.1c2.1,2,4.4,3.8,5,3.9c0.9,0.2,2-0.3,5.5-2.7c15.4-10.5,33-18.9,50.3-24c9.2-2.8,9.3-2.9,6-10.7c-2.1-4.9-5.2-13.8-5.2-14.9c0-0.3,0.1-0.5,0.4-0.5C118.9,68,122.4,69.7,126.4,71.7z M197,94.6c9.4,3.7,19.7,10.1,27.3,16.7c5,4.4,11,11.4,13.1,15.4c1.3,2.6,1.4,2.9,0.9,4.2c-1.8,4.3-11.9,15.1-19.5,20.8c-4.6,3.5-10.7,7.2-15.1,9.5c-3.6,1.8-11.1,5-11.8,5c-0.7,0-5.3-7.7-7.1-11.9c-8.1-18.9-6.3-41.1,4.7-57.9c1.3-1.9,2.5-3.6,2.8-3.6C192.5,93,194.7,93.7,197,94.6z" />
        <path className={FISH_COLOUR_HEAD_MAP[colour]} d="M202.5,115.7c-4.7,2-5.8,8.2-2.1,11.9c5.2,5.2,13.7,0.6,12.3-6.7C211.9,116.5,206.7,113.9,202.5,115.7z" />
      </svg>
  </>
)
