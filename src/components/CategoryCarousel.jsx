import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science Engineer",
  "Graphic Designer",
  "Full Stack Developer",
  "Cloud Engineer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20 relative px-8">
        <CarouselContent className="-ml-2 md:-ml-4">
          {category.map((cat, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-auto">
              <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full whitespace-nowrap">{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
