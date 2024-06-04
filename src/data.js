export const colors = {
    sand: "#f1ef53", 
    soil: "#2f1907",
    sawdust: "#d3c690",
    water: "#0a2bef", 
    lava: "#a02200",
    wood: "#412801", 
    stone: "#636363", 
    steel: "#989797",
    smoke: "#1d1c1a", 
    steam: "#b8bcd4",
}

export const types = {
    none: "none", 
    sand: "sand", 
    soil: "soil",
    sawdust: "sawdust",
    water: "water", 
    lava: "lava",
    wood: "wood",
    stone: "stone", 
    steel: "steel",
    smoke: "smoke",
    steam: "steam",
}

export const colorNoise = (color, amount) => {
    const rgb = color.substring(1).match(/.{1,2}/g).map((hex) => parseInt(hex, 16));

    const noisedRGB = rgb.map((channel) => {
        const noise = (Math.random() * 2 - 1) * amount;
        return Math.min(255, Math.max(0, Math.round(channel + noise)));
    });

    return `#${noisedRGB.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
}

/*
    Source: https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color
*/
export const invertColor = (hex, bw) => {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}
