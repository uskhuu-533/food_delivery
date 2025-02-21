"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Category = () => {
  return (
    <div className="flex flex-col w-full">
      <p>Categories</p>
      <Carousel>
        <CarouselContent>
          <CarouselItem className="basis-1/3">...</CarouselItem>
          <CarouselItem className="basis-1/3">...</CarouselItem>
          <CarouselItem className="basis-1/3">...</CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};
export default Category;
