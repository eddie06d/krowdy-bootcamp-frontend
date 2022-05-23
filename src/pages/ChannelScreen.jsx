import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardLayout from "../components/CardLayout";

export default function ChannelScreen() {
    const [ channels, setChannels ] = useState([]);
    
    const navigate = useNavigate();
    
    const refCheckEmail = useRef();
    const refCheckMessage = useRef();
    const refCheckWhatsapp = useRef();
    
    const cssRadioSelected = "flex items-center p-3 border rounded gap-4 text-base cursor-pointer text-[#6eb1ef] border-[#6eb1ef]";
    
    const cssRadioUnselected = "flex items-center p-3 border rounded gap-4 text-base cursor-pointer text-gray-400 border-gray-200";

    const handleContainerClick = (type) => {
        switch(type) {
          case "Email":
            refCheckEmail.current.click();
            break;
          case "Mensaje":
            refCheckMessage.current.click();
            break;
          case "Whatsapp":
            refCheckWhatsapp.current.click();
            break;
          default:
            break;
        }
    };

    const handleInputChange = (e) => {
        if(e.target.checked) {
            setChannels([...channels, e.target.value]);
        } else {
            setChannels(channels.filter(channel => channel !== e.target.value));
        }
    };

    const handleCheck = () => refCheckEmail.current?.checked || refCheckMessage.current?.checked || refCheckWhatsapp.current?.checked;

    const handleClick = () => {
        console.log(channels);
        localStorage.setItem("channels", JSON.stringify(channels));
        navigate("/messages");
    };

    return (
        <CardLayout title="Selección de canales">
            <div className="flex flex-col gap-2">
                <div className={ refCheckEmail.current?.checked ? cssRadioSelected:cssRadioUnselected } onClick={() => handleContainerClick('Email')}>
                    <input
                        type="checkbox"
                        onChange={handleInputChange}
                        value="Correo electronico"
                        className="w-5 h-5"
                        ref={refCheckEmail}
                    />
                    <span>Correo electrónico</span>
                </div>
                <div className={ refCheckMessage.current?.checked ? cssRadioSelected:cssRadioUnselected } onClick={() => handleContainerClick('Mensaje')}>
                    <input
                        type="checkbox"
                        onChange={handleInputChange}
                        value="Mensaje de texto"
                        className="w-5 h-5"
                        ref={refCheckMessage}
                    />
                    <span>Mensaje de texto</span>
                </div>
                <div className={ refCheckWhatsapp.current?.checked ? cssRadioSelected:cssRadioUnselected } onClick={() => handleContainerClick('Whatsapp')}>
                    <input
                        type="checkbox"
                        onChange={handleInputChange}
                        value="Whatsapp"
                        className="w-5 h-5"
                        ref={refCheckWhatsapp}
                    />
                    <span>Whatsapp</span>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    className="text-[#6eb1ef] border border-[#6eb1ef] rounded-md py-2 px-5"
                    onClick={() => navigate("/")}
                >
                    Atrás
                </button>
                <button
                    type="button"
                    className="bg-[#6eb1ef] text-white rounded-md py-2 px-5"
                    onClick={handleClick}
                    disabled={!handleCheck()}
                >
                    Siguiente
                </button>
            </div>
        </CardLayout>
    )
}