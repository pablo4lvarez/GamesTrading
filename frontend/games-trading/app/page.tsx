'use client'

import TradesCounter from '@/components/TradesCounter'
import Hero from '../components/Hero'
import Searcher from '@/components/Searcher'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Home() {

  const session = useSession();
  const router = useRouter();

  return (
    <>
      <Hero router={router}></Hero>
      <TradesCounter/>
      <Searcher/>
    </>
  )
}


