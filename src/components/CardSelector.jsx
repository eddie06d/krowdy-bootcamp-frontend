import CardEmail from "./CardEmail";
import CardMessage from "./CardMessage";
import CardWhatsapp from "./CardWhatsapp";

export default function CardSelector({ channel, channels, iterator, setIterator }) {

    return (
        <>
            {
                channel == 'Correo electronico' ? (
                    <CardEmail iterator={iterator} setIterator={setIterator} channels={channels} /> 
                ) : (
                    channel == 'Mensaje de texto' ? (
                        <CardMessage iterator={iterator} setIterator={setIterator} channels={channels} />
                    ) : (
                        <CardWhatsapp iterator={iterator} setIterator={setIterator} channels={channels} />
                    )
                )
            }
        </>
    );
}