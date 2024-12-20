import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Featured = () => {
  const images = [
    { url: "/pawpatrol.jpg", altText: "Paw Patrol" },
    { url: "/stella.JPG", altText: "Stella" },
    { url: "/xmascupcakes.png", altText: "Christmas Cupcakes" },
  ];
  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="w-full h-[90vh]"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center transition-opacity hover:opacity-90"
              style={{ backgroundImage: `url(${img.url})` }}
              aria-label={img.altText}
            >
              <div className="absolute bottom-8 w-full text-center px-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-50 drop-shadow-lg mb-4 font-cookie">
                  Featured Designs
                </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-next text-white absolute top-1/2 right-5 z-10">
          <i className="fa fa-arrow-right text-4xl"></i>
        </div>
        <div className="swiper-button-prev text-white absolute top-1/2 left-5 z-10">
          <i className="fa fa-arrow-left text-4xl"></i>
        </div>
      </Swiper>
    </>
  );
};

export default Featured;
