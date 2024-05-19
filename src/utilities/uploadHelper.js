const isResolution = (width,height,res) => {
    switch (res) {
        case 240: if(width >= 240 && height >= 426) return true;
                    break;
        case 360:if(width >= 360 && height >= 640) return true;
                    break;
        case 480:if(width >= 480 && height >= 854) return true;
                    break;
        case 720:if(width >= 720 && height >= 1280) return true;
                    break;
        case 1080:if(width >= 1080 && height >= 1920) return true;
                    break;
        default: return false;
    }
    return false;
} 

export { isResolution };