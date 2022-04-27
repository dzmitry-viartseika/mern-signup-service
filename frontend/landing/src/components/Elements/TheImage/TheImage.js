import React from "react";

const Image = ({ name }) => {
    try {
        console.log('name', name);
        // Import image on demand
        const image = `../../assets/images/${name}`;
        console.log('image', image);
        // If the image doesn't exist. return null
        if (!image) return null;
        return <img src={image.default} />;
    } catch (error) {
        console.log(`Image with name "${name}" does not exist`);
        return null;
    }
};

export default Image;
