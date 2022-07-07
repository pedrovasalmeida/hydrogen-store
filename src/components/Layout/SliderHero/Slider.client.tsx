import {
  faFacebookF,
  faInstagram,
  faPinterest,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import Button from '../../Button/Button';
import { ICarousel, ISeoHeroComponent } from './types/interfaces';

export default function Slider({ seoHeroComponents }: any) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [backgroundImage, setBackgroundImage] = useState("")

  const urlImages = seoHeroComponents.map(
    (seoHeroComponent: ISeoHeroComponent) => seoHeroComponent?.heroImages?.url,
  );

  useEffect(() => {
    setBackgroundImage(urlImages[activeIndex]);
  }, [activeIndex, urlImages]);

  return (
    <section className="xl:h-[660px] h-fit bg-no-repeat bg-top"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Carousel activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
        {seoHeroComponents.map((seoHeroComponent: ISeoHeroComponent) => (
          <CarouselItem key={seoHeroComponent.heroHeadingName}>
            <HeroSlider
              collectionHeroName={seoHeroComponent.collectionHeroName}
              heroHeadingName={seoHeroComponent.heroHeadingName}
              heroSEOText={seoHeroComponent.heroSEOText}
              textLink={seoHeroComponent.textLink}
            />
          </CarouselItem>
        ))}
      </Carousel>
      <Socials />
    </section>
  )
}

function Carousel({ children, activeIndex, setActiveIndex }: ICarousel) {
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="whitespace-nowrap transition-all duration-500"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { width: "100%" });
          })}
        </div>
      </div>
      <CarouselArrows
        childrenNodes={children}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </div>
  );
}

function CarouselItem({children, width}: any) {
  return (
    <div className="inline-flex whitespace-normal z-[1]" style={{ width }}>
      {children}
    </div>
  );
}

function HeroSlider({
  collectionHeroName,
  heroHeadingName,
  heroSEOText,
  textLink,
}: ISeoHeroComponent) {
  return (
    <div className="w-full h-full pt-16 xl:pt-40 pb-10">
      <div className="w-full md:max-w-[720px] xl:max-w-[1170px] px-4 md:mx-auto">
        <div className="flex flex-col flex-wrap">
          <div className="xl:flex-half xl:max-w-1/2 md:max-w-more-than-half md:flex-more-than-half">
            <h6 className="text-sm font-bold uppercase tracking-[2px] text-red-500 mb-7">
              {collectionHeroName}
            </h6>
            <h2 className="text-5xl font-bold text-black mb-8 ">
              {heroHeadingName}
            </h2>
            <p className="text-base mb-9 text-gray-800">{heroSEOText}</p>
            <Button
              label="Shop Now ->"
              url={textLink}
              className="w-52 py-4 text-sm rounded-none tracking-widest"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CarouselArrows({
  childrenNodes,
  activeIndex,
  setActiveIndex,
}: ICarousel) {
  const UpdateIndex = (newIndex: any) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(childrenNodes) - 1;
    } else if (newIndex >= React.Children.count(childrenNodes)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  return (
    <>
      <button
        className="absolute xl:top-2/3 xl:left-24 h-7 md:left-0 md:top-52 left-6"
        onClick={() => UpdateIndex(activeIndex - 1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="h-7" />
      </button>
      <button
        className="absolute xl:top-2/3 xl:right-24 h-7 md:right-0 md:top-52 left-48"
        onClick={() => UpdateIndex(activeIndex + 1)}
      >
        <FontAwesomeIcon icon={faArrowRight} className="h-7" />
      </button>
    </>
  );
}

function Socials() {
  return (
    <div className="mt-16 md:mt-0 pb-8 mx-4 md:mx-10 xl:mx-48 desktop:mx-96 flex">
      <Button
        label={
          <FontAwesomeIcon className="w-4 text-black" icon={faFacebookF} />
        }
        url="/"
        className="px-0 w-5 h-6 rounded-none bg-transparent hover:bg-transparent"
      />
      <Button
        label={
          <FontAwesomeIcon className="w-4 text-black" icon={faInstagram} />
        }
        url="/"
        className="w-5 h-6 rounded-none bg-transparent hover:bg-transparent"
      />
      <Button
        label={
          <FontAwesomeIcon className="w-4 text-black" icon={faPinterest} />
        }
        url="/"
        className="w-5 h-6 rounded-none bg-transparent hover:bg-transparent"
      />
      <Button
        label={<FontAwesomeIcon className="w-4 text-black" icon={faTwitter} />}
        url="/"
        className="w-5 h-6 rounded-none bg-transparent hover:bg-transparent"
      />
    </div>
  );
}