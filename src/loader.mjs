import { Texture } from 'ogl';

// not sure why this doesn't work locally
// async function getImage(src) {
//     const response = await fetch(src, { mode: 'cors' });
//     const blob = await response.blob();
//     const objectUrl = (URL ? URL : webkitURL).createObjectURL(blob);
//     const img = new Image();
//     img.src = objectUrl;
//     return img;
// }

/**
 * async loads image 
 * @param src {string}
 * @returns {Promise<HTMLImageElement>}
 */
function getImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = '';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

function powerOfTwo(value) {
    return Math.log2(value) % 1 === 0;
}

export async function loadTextureAsync(src) {
    const image = await getImage(src);
    const powerImage = powerOfTwo(image.width) && powerOfTwo(image.height);

    return (gl) => {
        const notPowerDefault = powerImage ? {} : {
            generateMipmaps: false,
            minFilter: gl.LINEAR,
            wrapS: gl.CLAMP_TO_EDGE,
            wrapT: gl.CLAMP_TO_EDGE,
        };
        return new Texture(gl, {
            image, ...notPowerDefault
        });
    };
}