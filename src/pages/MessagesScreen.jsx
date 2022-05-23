import { useEffect, useState } from "react";
import CardsChannel from "../components/CardsChannel";

export default function MessagesScreen() {
    const [ channels, setChannels ] = useState([]);

    useEffect(() => {
        const channelsLocal = localStorage.getItem("channels");
        if(channelsLocal) {
            setChannels(JSON.parse(channelsLocal));
        }
    }, []);

    return (
        <CardsChannel channels={channels} />
    )
}