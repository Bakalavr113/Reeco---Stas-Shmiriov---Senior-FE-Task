import React, { useRef, useState } from "react";
import Slider, { type SliderMethods } from "./Slider";
import { categories } from "~/constants";
import Chip from "./Chip";

interface ChipListProps {
  containerClassName?: string;
}

const ChipList: React.FC<ChipListProps> = ({ containerClassName }) => {
  const sliderRef = useRef<SliderMethods>(null);
  const [selectedCategory, setSelectedCategory] = useState("Snacks");
  return (
    <div className={containerClassName}>
      <h2 className="text-lg font-semibold mb-4 px-4">Categories</h2>
      <Slider
        containerClassName="px-4"
        contentContainerClassName="flex gap-4"
        ref={sliderRef}
        orientation="horizontal"
      >
        {categories.map((category) => (
          <Chip
            onSelect={(category) => setSelectedCategory(category)}
            selected={selectedCategory === category}
            key={category}
            category={category}
          />
        ))}
      </Slider>
    </div>
  );
};

export default ChipList;
