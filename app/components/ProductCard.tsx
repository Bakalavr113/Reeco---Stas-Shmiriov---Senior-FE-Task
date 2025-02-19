import React from "react";
import type { Product } from "~/types";
import Slider from "./Slider";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="w-full lg:w-[49%] xl:w-56 p-4 min-h-[280px] bg-white rounded-lg shadow-lg flex flex-col justify-between hover:scale-1.1 ">
      <Slider
        containerClassName="w-full h-full"
        contentContainerClassName="flex flex-nowrap w-full"
        withArrows
        scrollEnabled={false}
        itemClassName="w-full shrink-0 flex justify-center"
      >
        {product.images.map((image) => (
          <div key={image} className="w-full flex-shrink-0">
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
      <div>
        <h3 className="text-lg font-bold mt-2">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
