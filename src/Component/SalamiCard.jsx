/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useLocation, } from "react-router-dom";
import { Card, Button, Avatar } from "@material-tailwind/react";
import html2canvas from "html2canvas";

const SalamiCard = () => {
  const location = useLocation()
  console.log(location)
  const data = location.state?.data
  console.log(data)
  const { name, bkash , photoUrl} = data

  const handleDownloadImage = async (withText = true) => {
    // Get the card element from the DOM
    const cardElement = document.querySelector(".eid-salami-card");
  
    if (withText) {
      // Capture the entire card (image and text) using html2canvas
      try {
        const canvas = await html2canvas(cardElement, {
          scale: 1, // Avoid scaling issues
          logging: false, // Suppress unnecessary logs
          useCORS: true, // Enable CORS for external resources
        });
  
        // Convert the captured content to an image data URL
        const imgURI = canvas.toDataURL("image/png");
  
        // Create a temporary link element for download
        const link = document.createElement("a");
        link.href = imgURI;
        link.download = "SalamiCard.png";
  
        // Trigger the download by clicking the link
        link.click();
      } catch (err) {
        console.error("Error capturing card:", err);
      }
    }
  };
  return (
    <div>
      {/* <h2>hello there</h2> */}
      <Card className="shadow-md max-w-96 p-4 mx-auto eid-salami-card">
        <Avatar src={photoUrl} variant="circular" alt="photo" className="mx-auto w-40 h-40"/>
        <div className="p-4">
          <h2 size="h5" className="font-bold text-center">
            Eid Mubarak, {name}!
          </h2>
          <p className="text-gray-700 mt-2">
            May your Eid be filled with joy, blessings, and delicious food!
          </p>
          <p className="font-medium mt-4">
            Bkash/Nagad Number: {bkash}
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <Button onClick={handleDownloadImage} variant="outlined" rounded="full">
            Download
          </Button>
          <Button rounded="full" ml={2}>
            Share
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SalamiCard;
