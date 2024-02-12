'use client'

import TradesCounter from '@/components/TradesCounter'
import Hero from '../components/Hero'
import Searcher from '@/components/Searcher'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function Home() {

  const session = useSession();
  console.log('session:', session);

  return (
    <>
      <Hero></Hero>
      <TradesCounter/>
      <Searcher/>
    </>
  )
}


