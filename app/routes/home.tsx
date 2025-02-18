import type { Route } from "./+types/home";
import { useRef } from "react";
import type { SliderMethods } from "~/components/Slider";
import ProductCard from "~/components/ProductCard";
import Slider from "~/components/Slider";
import { categories, products } from "~/constants";
import ChipList from "~/components/ChipList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reeco.io test" },
    { name: "description", content: "Welcome to Test App!" },
  ];
}

export default function Home() {
  const sliderRef = useRef<SliderMethods>(null);
  return (
    <div className="flex flex-row justify-between p-6 gap-7 items-stretch h-screen overflow-hidden">
      <section className="bg-gray-50 lg:flex  lg:flex-[0.3] lg:flex-col  shadow-md rounded-2xl p-6 overflow-y-auto hidden">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="my-2">
          <p className="text-lg font-semibold px-4 py-2">Categories</p>
          <Slider
            withArrows={false}
            containerClassName="h-[200px] border border-green-reeco rounded-2xl p-4"
            orientation="vertical"
          >
            {categories.map((category) => {
              return (
                <div className="flex flex-row gap-2">
                  <input type="checkbox" id="scales" name="scales" checked />
                  <p>{category}</p>
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="my-2">
          <p className="text-lg font-semibold px-4 py-2">Categories</p>
          <Slider
            withArrows={false}
            containerClassName="h-[200px] border border-green-reeco rounded-2xl p-4"
            orientation="vertical"
          >
            {categories.map((category) => {
              return (
                <div className="flex flex-row gap-2">
                  <input type="checkbox" id="scales" name="scales" checked />
                  <p>{category}</p>
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="my-2">
          <p className="text-lg font-semibold px-4 py-2">Categories</p>
          <Slider
            withArrows={false}
            containerClassName="h-[200px] border border-green-reeco rounded-2xl p-4"
            orientation="vertical"
          >
            {categories.map((category) => {
              return (
                <div className="flex flex-row gap-2">
                  <input type="checkbox" id="scales" name="scales" checked />
                  <p>{category}</p>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>

      <section className="bg-gray-50 lg:flex-[0.7] shadow-md rounded-2xl overflow-hidden py-4">
        <ChipList containerClassName="mb-2" />
        <Slider
          orientation="vertical"
          containerClassName="h-screen"
          withArrows={false}
        >
          <div className="flex flex-wrap mt-10 justify-start items-stretch gap-8 lg:gap-2 px-4 mb-60">
            {products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        </Slider>
      </section>
    </div>
  );
}
