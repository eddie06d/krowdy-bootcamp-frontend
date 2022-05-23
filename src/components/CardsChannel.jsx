import { useState } from "react";
import CardSelector from "./CardSelector";

export default function CardsChannel({ channels }) {
    const [ iterator, setIterator ] = useState(0);

    return (
        <>
            {
                <CardSelector 
                    iterator={iterator}
                    setIterator={setIterator}
                    channel={channels[iterator]}
                    channels={channels}
                />                    
            }
        </>
    );
}