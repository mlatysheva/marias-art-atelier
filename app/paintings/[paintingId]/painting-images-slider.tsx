'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import { IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface PaintingImageSliderProps {
  images: string[];
  alt: string;
}

export default function PaintingImageSlider({
  images,
}: PaintingImageSliderProps) {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
  });

  if (images.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div className="relative w-full max-w-[800px] mx-auto">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="keen-slider__slide flex items-center justify-center"
          >
            <Image
              src={img}
              alt={`Painting ${idx + 1}`}
              width={800}
              height={600}
              className="object-contain w-full h-auto"
              sizes="(max-width: 768px) 100vw, 800px"
              onClick={() => slider.current?.next()}
            />
          </div>
        ))}
      </div>

      {/* Navigation Chevron Buttons */}
      <IconButton
        onClick={() => slider.current?.prev()}
        sx={{
          position: 'absolute',
          top: '50%',
          left: {
            xs: '10px', // inside on mobile
            lg: '-80px', // desktops and up
          },
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(108, 108, 108, 0.6)',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'rgba(108, 108, 108, 0.9)',
          },
          boxShadow: 3,
        }}
      >
        <ChevronLeft fontSize="large" />
      </IconButton>

      <IconButton
        onClick={() => slider.current?.next()}
        sx={{
          position: 'absolute',
          top: '50%',
          right: {
            xs: '10px', // inside on mobile
            lg: '-80px', // outside on desktops
          },
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(108, 108, 108, 0.6)',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'rgba(108, 108, 108, 0.9)',
          },
          boxShadow: 3,
        }}
      >
        <ChevronRight fontSize="large" />
      </IconButton>
    </div>
  );
}
