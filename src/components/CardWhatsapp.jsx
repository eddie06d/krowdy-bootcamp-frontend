import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import CardLayout from "./CardLayout";

export default function CardWhatsapp({ iterator, setIterator, channels }) {
    const [ form, handleInputChange, reset ] = useForm({
        mensaje: ""
    });

    const { mensaje } = form;

    const navigate = useNavigate();

    useEffect(() => {
        const typeMessage = localStorage.getItem("typeMessage");
        if(typeMessage == 'Invitacion') {
            reset({
                mensaje: "Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra más información aquí: [Link]"
            });
        } else if(typeMessage == 'Recordatorio de proceso') {
            reset({
                mensaje: "Hola, [userName] nos gustaría recordarte que tienes pendiente un proceso. Entra aquí para continuar [Link]"
            });
        }
    }, []);

    const saveMessage = () => {
        const messages = JSON.parse(localStorage.getItem("messages")) || {};
        localStorage.setItem("messages", JSON.stringify({
            ...messages,
            [channels[iterator]]: {
                mensaje
            }
        }));
    };

    const handleBack = () => {
        if(iterator == 0) {
            navigate("/channel");
            return;
        }
        setIterator(iterator - 1);
    }

    const handleNext = () => {
        if(iterator < channels.length - 1) {
            saveMessage();
            setIterator(iterator + 1);
        }else if(iterator == channels.length - 1){
            saveMessage();
            console.log({
                typeMessage: localStorage.getItem("typeMessage"),
                messages: JSON.parse(localStorage.getItem("messages"))
            });
            localStorage.clear();
            navigate("/");
        }
    };
    
    return (
        <CardLayout title="Whatsapp">
            <form className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <label className="text-sm">Mensaje</label>
                    <textarea
                        type="text"
                        name="mensaje"
                        rows={4}
                        value={mensaje}
                        onChange={handleInputChange}
                        className="border rounded-md px-2 py-3 outline-none"
                        placeholder="Escribe..."
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        className="text-[#6eb1ef] border border-[#6eb1ef] rounded-md py-2 px-5"
                        onClick={handleBack}    
                    >
                        Atrás
                    </button>
                    <button
                        type="submit"
                        className="bg-[#6eb1ef] text-white rounded-md py-2 px-5"
                        onClick={handleNext}
                    >
                        { iterator==channels.length-1 ? 'Enviar':'Siguiente'}
                    </button>
                </div>
            </form>
        </CardLayout>
    );
}