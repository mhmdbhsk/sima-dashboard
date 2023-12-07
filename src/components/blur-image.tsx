'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

import { cn } from '@/utils'

type BlurImageProps = {
  image: string
  className?: string
} & Partial<ImageProps>

export default function BlurImage({ image, className, ...props }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true)

  return (
    <div className={cn(className, 'aspect-square w-full overflow-hidden')}>
      <Image
        {...props}
        alt={image}
        src={image}
        className={cn(
          className,
          `
          duration-700 ease-in-out group-hover:opacity-75
          ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'})`
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  )
}
