'use client'

import dynamic from 'next/dynamic'

const WorldMap = dynamic(() => import('./world-map'), {
  ssr: false,
})

export default function WorldMapClient(props: any) {
  return <WorldMap {...props} />
}
