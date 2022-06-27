import React from 'react'
import Layout from '../components/Layout.server'
import SliderHero from '../components/SliderHero/SliderHero.server'

export default function Home() {
  return (
  <Layout hero={<SliderHero />}>
    <div className='font-black text-xl'>Hello my brudda</div>
  </Layout>
  )
}
