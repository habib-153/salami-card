/* eslint-disable no-unused-vars */
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
          bkash: formData.bkash,
          nagad: formData.nagad,
          rocket: formData.rocket,
          upay: formData.upay,
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

  const handleShare = () => {
    if (!cardData) return;

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
  };
  return (
    <>
      <div className="container mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold text-center">
          Eid Card Generator
        </h1>
        <CardForm handleCardGeneration={handleCardGeneration} />
      </div>
    </>
  );
}

export default App;
