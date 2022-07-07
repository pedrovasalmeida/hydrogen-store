import { ReactNode } from 'react';

export interface ISliderProps {
  seoHeroComponents: ISeoHeroComponent[]
}

export interface ISeoHeroComponent {
  collectionHeroName?: string
  heroHeadingName?: string
  heroSEOText?: string
  textLink: string | ""
  heroImages?: {
    id: string
    size: number
    url: string
  }
}

export interface ICarousel {
  activeIndex: number
  setActiveIndex: (index: number) => void
  children?: ReactNode | any
  childrenNodes?: ReactNode
}