/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import { Card, Button, Avatar } from "@material-tailwind/react";
import img from "../assets/Screenshot_2024-04-10_000413-removebg-preview.png";
import html2canvas from "html2canvas";
//import './card.css'
import img2 from "../assets/bg.png";
import bkashLogo from "../assets/bkash2.png";
import nagadLogo from '../assets/nagad1.png'
import rocketLogo from '../assets/rocket1.png'
import upayLogo from '../assets/upay.png'

const SalamiCard = () => {
  const location = useLocation();
  console.log(location);
  const data = location.state?.data;
  console.log(data);
  

  const handleDownloadImage = async (withText = true) => {
    // Get the card element from the DOM
    const cardElement = document.querySelector(".eid-salami-card");
    if (withText) {
      // Create a new canvas element with matching size
      const maskCanvas = document.createElement("canvas");
      const maskCtx = maskCanvas.getContext("2d");
      maskCanvas.width = cardElement.clientWidth;
      maskCanvas.height = cardElement.clientHeight;

      // Draw a rectangle to cover the entire card area with a slight transparent black fill
      maskCtx.fillStyle = "rgba(0, 0, 0, 0)"; // Adjust transparency as needed
      maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

      // Proceed with capturing the card content
      const cardCanvas = await html2canvas(cardElement, {
        scale: 1, // Avoid scaling issues
        logging: false, // Suppress unnecessary logs
        useCORS: true, // Enable CORS for external resources
      });
      const ctx = cardCanvas.getContext("2d");

      // Draw the mask canvas onto the card canvas (effectively masking the shadow)
      ctx.drawImage(maskCanvas, 0, 0);

      // Convert the captured content (with mask) to an image data URL
      const imgURI = cardCanvas.toDataURL("image/png");

      // Create a temporary link element for download
      const link = document.createElement("a");
      link.href = imgURI;
      link.download = "SalamiCard.png";

      // Trigger the download by clicking the link
      link.click();
    }
  };
  return (
      <div className="p-2">
        <Card className="max-w-[360px]  min-h-[520px] mx-auto eid-salami-card  relative">
          <figure className="h-full">
            <img className="min-h-[520px]" src={img2} alt="" />
          </figure>
          <div className="absolute">
            <figure>
              <img className="mx-auto" src={img} alt="" />
            </figure>
            <div className="relative -top-16 text-center md:-top-20">
              <Avatar
                src={data?.photoUrl}
                variant="circular"
                alt="photo"
                className="mx-auto h-44 w-44"
              />
              <div className="p-2">
                <h2 size="h5" className="font-bold text-black text-lg text-center">
                আসসালামু আলাইকুম, ঈদ মুবারক!
                </h2>
                <p className="text-black mt-1">
                  সালাম তো দিলাম , এখন সালামী দেয়ার দায়িত্ব আপনার।
                </p>
                <div className="flex flex-wrap gap-2 items-center justify-center">
                  {data?.bkash ? (
                  <div className="font-medium flex items-center justify-center gap-2 text-black mt-4">
                    <img className="size-8" src={bkashLogo} alt="" /> {data?.bkash}
                  </div>
                ) : undefined
                }
                {data?.nagad ? (
                  <div className="font-medium flex items-center justify-center gap-2 text-black mt-4">
                    <img className="size-8" src={nagadLogo} alt="" /> {data?.nagad}
                  </div>
                ) : undefined
                }
                {data?.rocket ? (
                  <div className="font-medium flex items-center justify-center gap-2 text-black mt-4">
                    <img className="size-8" src={rocketLogo} alt="" /> {data?.rocket}
                  </div>
                ) : undefined
                }
                {data?.upay ? (
                  <div className="font-medium flex items-center justify-center gap-2 text-black mt-4">
                    <img className="size-8" src={upayLogo} alt="" /> {data?.upay}
                  </div>
                ) : undefined
                }
                </div>
              </div>
            </div>
          </div>
        </Card>
        <div className="flex justify-center my-8 gap-4">
          <Button
            onClick={handleDownloadImage}
            variant="outlined"
            rounded="full"
          >
            Download
          </Button>
        </div>
      </div>
  );
};

export default SalamiCard;
