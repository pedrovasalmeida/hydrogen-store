import { CacheShort, gql, log, useQuery } from '@shopify/hydrogen'
import request from 'graphql-request';
import React from 'react'

export default function SliderHero() {
  const {data} = useQuery(
    "hero components",
    async () => {
      return await request({
        url: `${process.env.GRAPH_CMS_ENDPOINT}`,
        document: GetHeroComponentInfo,
        requestHeaders: {
          Authorization: `Bearer ${process.env.GRAPH_CMS_TOKEN}`,
        },
      }).catch((error: any) => log.debug(error));
    },
    {cache: CacheShort()}
  )

  log.debug(data.seoHeroSliders[0])

  return (
    <div>SliderHero</div>
  )
}

const GetHeroComponentInfo = gql`
  {
    seoHeroSliders {
      id
      seoHeroComponents {
        collectionHeroName
        heroHeadingName
        heroSEOText
        textLink
        heroImages {
          id
          size
          url
        }
      }
    }
  }
`;