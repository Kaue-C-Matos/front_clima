import { useEffect } from "react";
import { useMap } from "react-leaflet";

function ChangeMap({center}){
    const map = useMap();

    useEffect(()=>{
        if (center) {
            map.setView(center, map.getZoom())
        }
    }, [center, map])
    return null
}

export default ChangeMap;