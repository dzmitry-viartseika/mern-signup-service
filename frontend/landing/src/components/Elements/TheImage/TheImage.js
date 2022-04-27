import React from "react";

const Image = ({ name }) => {
    try {
        const image = `../../assets/images/${name}`;
        if (!image) return null;
        return <img src={image.default} />;
    } catch (error) {
        console.log(`Image with name "${name}" does not exist`);
        return null;
    }
};

export default Image;
