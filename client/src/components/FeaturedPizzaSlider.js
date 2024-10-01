import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const slides = [
  {
    title: "Make Your First Order and Get 50% Off",
    description:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.",
    image: "/fullpizza.png",
  },
  {
    title: "Try Our New Specialty Pizza",
    description:
      "Discover our latest creation with premium toppings and a perfect blend of flavors. Limited time offer!",
    image: "/api/placeholder/600/600",
  },
  {
    title: "Family Deal: 2 Large Pizzas",
    description:
      "Perfect for game night! Get two large pizzas with up to 3 toppings each, plus a 2-liter soda.",
    image: "/api/placeholder/600/600",
  },
];

const FeaturedPizzaSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: "#fff5e6" }}>
      <Typography variant="h4" sx={{ color: "#666", marginBottom: 2 }}>
        Featured pizza
      </Typography>
      <Box
        sx={{
          backgroundColor: "#2c6e49",
          borderRadius: 4,
          display: "flex",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box sx={{ flex: 1, padding: 4, color: "white", zIndex: 1, maxWidth:"700px" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            {slides[currentSlide].title.split(" ").map((word, index) =>
              word === "Off" || word === "50%" ? (
                <Typography
                  key={index}
                  component="span"
                  variant="h4"
                  sx={{ color: "#ffa500", fontWeight: "bold" }}
                >
                  {word}{" "}
                </Typography>
              ) : (
                word + " "
              )
            )}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            {slides[currentSlide].description}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ffa500",
              color: "white",
              "&:hover": { backgroundColor: "#ff8c00" },
            }}
          >
            Order Now
          </Button>
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: -100,
            top: -50,
            bottom: -50,
            width: "60%",
            overflow: "hidden",
          }}
        >
          <img
            src={slides[currentSlide].image}
            alt="Featured Pizza"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: currentSlide === index ? "#ffa500" : "#ccc",
              margin: "0 4px",
              cursor: "pointer",
            }}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedPizzaSlider;
