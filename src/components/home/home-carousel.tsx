"use client";

import { useGetStoreBanner } from "@/hooks/apis/use-get-store-banner";
import React, { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { parseUrlFromWakaToCurrent } from "@/helpers/link";

interface HomeCarouselProps {}

export const HomeCarousel: FC<HomeCarouselProps> = ({}) => {
  const { data } = useGetStoreBanner({
    initQueryParams: {},
  });

  console.log({ data });

  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      dotButton
    >
      <CarouselContent className="ml-0">
        {data?.map((banner) => (
          <CarouselItem key={banner.id} className="pl-0">
            <Link href={parseUrlFromWakaToCurrent(banner.target_url)}>
              <Image
                src={banner.image_url}
                alt={banner.title}
                width={1920}
                height={600}
                className="w-full"
                priority
              />
            </Link>
          </CarouselItem>
        ))}
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </CarouselContent>
    </Carousel>
  );
};
