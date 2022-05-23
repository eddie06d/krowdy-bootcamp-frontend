import CardLayout from "../components/CardLayout";
import { useForm } from "../hooks/useForm";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function TypeMessageScreen() {
  const [ form, handleInputChange ] = useForm({
    typeMessage: ""
  });

  const navigate = useNavigate();

  const refRadioInvite = useRef();
  const refRadioRecordatory = useRef();
  const refRadioPersonality = useRef();

  /* useEffect(() => {
    const typeMessage = localStorage.getItem("typeMessage");
    if(typeMessage) {
      switch(typeMessage) {
        case "Invitacion":
          refRadioInvite.current.click();
          break;
        case "Recordatorio de proceso":
          refRadioRecordatory.current.checked = true;
          break;
        case "Personalizado":
          refRadioPersonality.current.checked = true;
          break;
      }
    }
  }, []); */

  const cssRadioSelected = "flex items-center p-3 border rounded gap-4 text-base cursor-pointer text-[#6eb1ef] border-[#6eb1ef]";

  const cssRadioUnselected = "flex items-center p-3 border rounded gap-4 text-base cursor-pointer text-gray-400 border-gray-200";

  const { typeMessage } = form;

  const handleContainerClick = (type) => {
    switch(type) {
      case "Invitacion":
        refRadioInvite.current.click();
        break;
      case "Recordatorio":
        refRadioRecordatory.current.click();
        break;
      case "Personalizado":
        refRadioPersonality.current.click();
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    console.log(typeMessage);
    localStorage.setItem("typeMessage", typeMessage);
    navigate("/channel");
  };

  const handleCheckRadios = () => refRadioInvite.current?.checked || refRadioRecordatory.current?.checked || refRadioPersonality.current?.checked;

  return (
      <CardLayout title="Selección de tipo de mensaje">
        <div className="flex flex-col gap-2">
          <div className={ refRadioInvite.current?.checked ?  cssRadioSelected:cssRadioUnselected } onClick={() => handleContainerClick('Invitacion')}>
            <input
              type="radio"
              name="typeMessage"
              onChange={handleInputChange}
              value="Invitacion"
              className="w-5 h-5"
              ref={refRadioInvite}
            />
            <span>Invitación</span>
          </div>
          <div className={refRadioRecordatory.current?.checked ?  cssRadioSelected:cssRadioUnselected} onClick={() => handleContainerClick('Recordatorio')}>
            <input
              type="radio"
              name="typeMessage"
              onChange={handleInputChange}
              value="Recordatorio de proceso"
              className="w-5 h-5"
              ref={refRadioRecordatory}
            />
            <span>Recordatorio de proceso</span>
          </div>
          <div className={refRadioPersonality.current?.checked ?  cssRadioSelected:cssRadioUnselected} onClick={() => handleContainerClick('Personalizado')}>
            <input
              type="radio"
              name="typeMessage"
              onChange={handleInputChange}
              value="Personalizado"
              className="w-5 h-5"
              ref={refRadioPersonality}
            />
            <span>Personalizado</span>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="text-[#6eb1ef] border border-[#6eb1ef] rounded-md py-2 px-5"
          >
            Cancelar
          </button>
          <button
            type="button"
            className="bg-[#6eb1ef] text-white rounded-md py-2 px-5"
            onClick={handleClick}
            disabled={!handleCheckRadios()}
          >
            Siguiente
          </button>
        </div>
      </CardLayout>
  )
    
}