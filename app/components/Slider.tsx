import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface SliderProps {
  children: ReactNode;
  orientation?: "horizontal" | "vertical";
  containerClassName?: string;
  contentContainerClassName?: string;
  withArrows?: boolean;
}

export interface SliderMethods {
  scrollTo: (index: number) => void;
  scrollToOffset: (offset: number) => void;
  scrollToItem: (index: number) => void;
}

const Slider = forwardRef<SliderMethods, SliderProps>(
  (
    {
      children,
      orientation = "horizontal",
      containerClassName = "",
      contentContainerClassName = "",
      withArrows = true,
    },
    ref
  ) => {
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);

    useImperativeHandle(ref, () => ({
      scrollTo,
      scrollToOffset,
      scrollToItem,
    }));

    const scrollTo = (index: number) => {
      if (!sliderRef.current) return;

      const containerSize =
        orientation === "horizontal"
          ? sliderRef.current.clientWidth
          : sliderRef.current.clientHeight;

      sliderRef.current.scrollTo({
        [orientation === "horizontal" ? "left" : "top"]: index * containerSize,
        behavior: "smooth",
      });
    };

    const scrollToOffset = (offset: number) => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({
          [orientation === "horizontal" ? "left" : "top"]: offset,
          behavior: "smooth",
        });
      }
    };

    const scrollToItem = (index: number) => {
      if (!itemsRef.current[index] || !sliderRef.current) return;

      const item = itemsRef.current[index];
      const container = sliderRef.current;

      if (orientation === "horizontal") {
        container.scrollTo({
          left: item.offsetLeft - container.offsetLeft,
          behavior: "smooth",
        });
      } else {
        container.scrollTo({
          top: item.offsetTop - container.offsetTop,
          behavior: "smooth",
        });
      }
    };

    const handleNext = () => {
      if (!sliderRef.current) return;

      const containerSize =
        orientation === "horizontal"
          ? sliderRef.current.clientWidth
          : sliderRef.current.clientHeight;

      scrollToOffset(containerSize + 32);
    };

    const handlePrev = () => {
      if (!sliderRef.current) return;

      const containerSize =
        orientation === "horizontal"
          ? sliderRef.current.clientWidth
          : sliderRef.current.clientHeight;

      scrollToOffset(-containerSize - 32);
    };

    const updateButtonVisibility = () => {
      if (!sliderRef.current) return;

      const {
        scrollLeft,
        scrollTop,
        scrollWidth,
        scrollHeight,
        clientWidth,
        clientHeight,
      } = sliderRef.current;

      if (orientation === "horizontal") {
        setAtStart(scrollLeft <= 0);
        setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
      } else {
        setAtStart(scrollTop <= 0);
        setAtEnd(scrollTop + clientHeight >= scrollHeight - 1);
      }
    };

    useEffect(() => {
      const slider = sliderRef.current;
      if (!slider) return;

      slider.addEventListener("scroll", updateButtonVisibility);
      updateButtonVisibility();

      return () => {
        slider.removeEventListener("scroll", updateButtonVisibility);
      };
    }, []);

    return (
      <div className={`relative ${containerClassName}`}>
        {withArrows && !atStart && (
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
            onClick={handlePrev}
          >
            <FaArrowLeft className="lg:w-5 lg:h-5 w-3 h-3" />
          </button>
        )}

        <div
          ref={sliderRef}
          className={`flex ${
            orientation === "vertical"
              ? "flex-col overflow-y-auto h-full"
              : "overflow-x-auto whitespace-nowrap flex-nowrap w-full"
          } no-scrollbar`}
        >
          <div
            className={`flex ${
              orientation === "vertical" ? "flex-col" : "flex-row"
            } ${contentContainerClassName}`}
          >
            {React.Children.map(children, (child, index) => (
              <div
                ref={(el) => {
                  if (el) itemsRef.current[index] = el;
                }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>

        {withArrows && !atEnd && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
            onClick={handleNext}
          >
            <FaArrowRight className="lg:w-5 lg:h-5 w-3 h-3" />
          </button>
        )}
      </div>
    );
  }
);

export default Slider;
