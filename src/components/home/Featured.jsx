import React from "react";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
} from "mdb-react-ui-kit";

const Featured = ({ products, isPending, isError, error }) => {
  return (
    <div>
      {isError ||
        (isPending && (
          <div>Error: {error?.message || "Failed to fetch products"}</div>
        ))}
      {!isPending && !isError && products && (
        <MDBCarousel showControls showIndicators>
          <MDBCarouselItem itemId={products[37].id}>
            <img
              src={products[37].img}
              className="w-full h-[600px] object-cover object-center"
              alt={products[37].name}
            />
            <MDBCarouselCaption>
              <h5>{products[37].name}</h5>
              <p>{products[37].description}</p>
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId={products[41].id}>
            <img
              src={products[41].img}
              className="w-full h-[600px] object-cover object-center"
              alt={products[41].name}
            />

            <MDBCarouselCaption>
              <h5>{products[41].name}</h5>
              <p>{products[41].description}</p>
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId={products[8].id}>
            <img
              src={products[8].img}
              className="w-full h-[600px] object-cover object-center"
              alt={products[8].name}
            />
            <MDBCarouselCaption>
              <h5>{products[8].name}</h5>
              <p>{products[8].description}</p>
            </MDBCarouselCaption>
          </MDBCarouselItem>
        </MDBCarousel>
      )}
    </div>
  );
};

export default Featured;
