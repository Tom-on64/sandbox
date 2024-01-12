export const colors = {
    sand: "#f1ef53", 
    water: "#0a2bef", 
    wood: "#412801", 
    stone: "#6c6c7c", 
    smoke: "#1d1c1a", 
}

export const types = {
    none: "none", 
    sand: "sand", 
    water: "water", 
    wood: "wood", 
    stone: "stone", 
    smoke: "smoke", 
}

export const colorNoise = (color, amount) => {
    const rgb = color.substring(1).match(/.{1,2}/g).map((hex) => parseInt(hex, 16));

    const noisedRGB = rgb.map((channel) => {
        const noise = (Math.random() * 2 - 1) * amount;
        return Math.min(255, Math.max(0, Math.round(channel + noise)));
    });

    return `#${noisedRGB.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
}
