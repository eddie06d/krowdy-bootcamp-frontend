import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import CardLayout from "./CardLayout";

export default function CardEmail({ iterator, setIterator, channels }) {
    const [ form, handleInputChange, reset ] = useForm({
        asunto: "",
        mensaje: ""
    });

    useEffect(() => {
        const typeMessage = localStorage.getItem("typeMessage");
        if(typeMessage == 'Invitacion') {
            reset({
                asunto: "Invitación a proceso",
                mensaje: "Hola, [userName] hemos visto tu perfil y nos parece interesante. Encuentra más información aquí: [Link]"
            });
        } else if(typeMessage == 'Recordatorio de proceso') {
            reset({
                asunto: "Recordatorio de proceso",
                mensaje: "Hola, [userName] nos gustaría recordarte que tienes pendiente un proceso. Entra aquí para continuar [Link]"
            });
        }
    }, []);

    const navigate = useNavigate();

    const { asunto, mensaje } = form;

    const handleBack = () => {
        if(iterator == 0) {
            navigate("/channel");
            return;
        }
        setIterator(iterator - 1);
    }
 
    const saveMessage = () => {
        const messages = JSON.parse(localStorage.getItem("messages")) || {};
        localStorage.setItem("messages", JSON.stringify({
            ...messages,
            [channels[iterator]]: {
                asunto,
                mensaje
            }
        }));
    };

    const handleNext = () => {
        if(iterator < channels.length - 1) {
            setIterator(iterator + 1);
            saveMessage();
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
        <CardLayout title="Correo electronico">
            <form className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <label className="text-sm">Asunto</label>
                    <input
                        type="text"
                        name="asunto"
                        value={asunto}
                        onChange={handleInputChange}
                        className="border rounded-md px-2 py-3 outline-none"
                        placeholder="Escribe..."
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm">Mensaje</label>
                    <textarea
                        type="text"
                        name="mensaje"
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