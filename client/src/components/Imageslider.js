import React, {useState} from "react";

// Screenshots of map and graph
const Images = [
    {
        label: "Map",
        imgPath:
            "./map-image.png",
    },
    {
        label: "Graph",
        imgPath:
            "./graph-image.png",
    },
];

const ImageSlider = () => {
    const [currentPictureIndex, setCurrentPictureIndex] = useState(0);

    // Function to go to the next picture
    // modulo % Images.length will equal 0 and wrap around to first image if prevPictureIndex + 1 = Images.length
    // This would mean you moved past the last image and no more new pictures, otherwise there will be an out of bounds error
    // If there is another picture, simply go to the next picture (prevPictureIndex +1)
    const goToNextPicture = () => {
        setCurrentPictureIndex((prevPictureIndex) => (prevPictureIndex + 1) % Images.length);
    };

    // Function to go to the previous picture
    // If prevPictureIndex === 0 there are no more new pictures, they have all been viewed
    // Therefore, wrap around back to last image (Images.length - 1), otherwise there will be an out of bounds error
    // If there is another picture, simply go to the previous picture (prevPictureIndex - 1)
    const goToPreviousPicture = () => {
        setCurrentPictureIndex((prevPictureIndex) =>
            prevPictureIndex === 0 ? Images.length - 1 : prevPictureIndex - 1);
    };

    return (
        <div style={{textAlign: 'center'}}>
            <h3>{Images[currentPictureIndex].label}</h3>
            <img
                src={Images[currentPictureIndex].imgPath}
                alt={Images[currentPictureIndex].label}
                style={{width: '700px', height: '450px', border: '5px solid black',}}
            />
            <div style={{marginTop: '10px'}}>
                <button style = {{padding: '10px 20px',
                backgroundColor: '#0047AB',
                color: 'white',
                border: 'none',
                borderRadius: '4px'}}
                 onClick={goToPreviousPicture}>
                 Previous
                </button>
                <button style = {{padding: '10px 20px',
                    backgroundColor: '#0047AB',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px', marginLeft: '10px'}}
                    onClick={goToNextPicture}>
                    Next
                </button>
            </div>
        </div>
    );
};


export default ImageSlider;