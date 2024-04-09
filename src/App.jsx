import { useState } from "react";
import "./App.css";
import CardForm from "./CardForm";
import { ShareSocial } from "react-share-social";
import { Button } from "@material-tailwind/react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

function App() {
  const [cardData, setCardData] = useState({});
  const navigate = useNavigate();
  const handleCardGeneration = async (formData) => {
    const imageFile = { image: formData.photo[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res) {
      const photoUrl = res.data.data.display_url;
      console.log(photoUrl);
      if(photoUrl){
        const data = {
          name: formData.name,
          bkash: formData.bkashNagadNumber,
          photoUrl: photoUrl
        }
        setCardData(data)
        console.log(data);
        if(data){
          navigate("/salamiCard", { state: { data } });
        }
      }
      
    }
  };
  const handleDownload = () => {
    if (!cardData) return;

    const cardElement = document.querySelector(".eid-salami-card");
    const svg = new window.SVGElement(0, 0); // Create SVG element
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(cardElement);

    // Add namespace for SVG (if using SVG elements in your card design)
    if (source.indexOf("<svg") !== -1) {
      source = `<?xml version="1.0" encoding="UTF-8"?>${source.replace(
        "<svg",
        '<svg xmlns="http://www.w3.org/2000/svg"'
      )}`;
    }

    svg.innerHTML = source;

    const svgData = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(svgData);
    downloadLink.download = "eid-salami-card.svg"; // Customize filename
    downloadLink.click();
  };

  const handleShare = () => {
    if (!cardData) return;

    // Choose your preferred social media sharing library/approach here
    // You can use libraries like react-share or social-sharing-buttons

    const message = `Eid Mubarak! Wishing you a joyful Eid with this salami card from ${cardData.name}.`;
    const cardUrl = URL.createObjectURL(
      new Blob([cardData.photoUrl], { type: "image/png" })
    ); // Example, adjust based on your photo handling

    // **Example using react-share (install it if needed: npm install react-share)**

    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${cardUrl}&quote=${message}`;
    return (
      // <ShareSocial url={shareUrl} social="facebook">
      //   <Button variant="primary" rounded="full">Share on Facebook</Button>
      // </ShareSocial>
      <ShareSocial url={shareUrl} socialTypes={"facebook"}>
        <Button rounded="full">Share on Facebook</Button>
      </ShareSocial>
    );

    // Replace with similar logic for other social media platforms (Twitter, etc.)
  };
  return (
    <>
      <div className="container mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Eid Salami Card Generator
        </h1>
        <CardForm handleCardGeneration={handleCardGeneration} />
        {/* {cardData ? (
        <div className="mt-8">
          <SalamiCard cardData={cardData} />
          <div className="flex justify-center mt-4">
            <Button variant="outlined" rounded="full" onClick={handleDownload}>
              Download
            </Button>
            <div className="ml-2">{handleShare()}</div>
          </div>
        </div>
      )
      : 
      <div>none</div>
    } */}
      </div>
    </>
  );
}

export default App;
