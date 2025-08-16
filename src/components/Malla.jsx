import { useState, useEffect } from "react";
import "../styles/malla.css";

const Malla = ({ carrera_id }) => {
  const [ramos, setRamos] = useState([]);
  const [selectedRamos, setSelectedRamos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = import.meta.env.PUBLIC_API_URL;
  useEffect(() => {
    fetch(`${API_URL}/api/carreras/carreras/${carrera_id}`)
      .then((response) => response.json())
      .then((data) => {
        setRamos(data.ramos);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        setIsLoading(false);
      });
  }, [carrera_id]);

  const handleClick = (ramo) => {
    if (selectedRamos && selectedRamos.nombre === ramo.nombre) {
      setSelectedRamos(null);
    } else {
      setSelectedRamos(ramo);
    }
  };

  const insertHyphen = (text) => {
    return text.replace(/(Electromag)(netismo)/, "$1&shy;$2");
  };

  const renderButton = (ramo) => {
    const isSelected = selectedRamos && selectedRamos.nombre === ramo.nombre;
    const hasPrev = selectedRamos && selectedRamos.prev.includes(ramo.nombre);
    const hasNext = selectedRamos && selectedRamos.next.includes(ramo.nombre);

    let buttonClass = "";
    if (isSelected) {
      buttonClass = "selected";
    } else if (hasPrev) {
      buttonClass = "prev";
    } else if (hasNext) {
      buttonClass = "next";
    }

    return (
      <div
        key={ramo.nombre}
        className={`ramo-card ${buttonClass} cursor-pointer transition-all duration-200 hover:shadow-lg`}
        onClick={() => handleClick(ramo)}
      >
        <div className="ramo-header">
          <h4 className="ramo-title !text-[11px] min-[1554px]:!text-[13px] font-semibold leading-tight">
            <span
              dangerouslySetInnerHTML={{ __html: insertHyphen(ramo.nombre) }}
            />
          </h4>
        </div>

        <div className="ramo-credits">
          <div className="credit-item">
            <span className="credit-label">SCT</span>
            <span className="credit-value">{ramo.sct || 0}</span>
          </div>
          <div className="credit-item">
            <span className="credit-label">TP</span>
            <span className="credit-value">{ramo.tp || 0}</span>
          </div>
          <div className="credit-item">
            <span className="credit-label">TA</span>
            <span className="credit-value">{ramo.ta || 0}</span>
          </div>
        </div>
      </div>
    );
  };

  const semesters = ramos
    .map((ramo) => ramo.semestre)
    .filter((semestre, index, self) => self.indexOf(semestre) === index)
    .sort((a, b) => a - b);

  if (isLoading) {
    return (
      <div className="loading-container pb-[920px] h-[1500px] min-[611px]:pb-[700px] min-[611px]:h-[1300px] min-[966px]:pb-[500px] min-[966px]:h-[1100px] ">
        <div className="spinner"></div>
      </div>
    );
  }

  if (ramos.length === 0) {
    return (
      <div className=" h-[1500px] flex flex-col gap-10 items-center justify-center text-center pb-[920px] min-[611px]:pb-[700px] min-[611px]:h-[1300px] min-[966px]:pb-[500px] min-[966px]:h-[1100px] ">
        <p className="text-xl font-semibold text-gray-600">
          Estamos trabajando para integrar la malla de tu carrera 💪
        </p>
        <img
          className="rounded-md"
          src="/catComputer.gif"
          alt="cat at computer"
        />
      </div>
    );
  }
  return (
    <div className="malla-grid  pb-[920px]  min-[340px]:pb-[970px] min-[966px]:pb-[500px]">
      {semesters.map((semester) => (
        <div key={semester} className="semester-column">
          <h3 className="!text-[16px] min-[1554px]:!text-lg ">
            Semestre {semester}
          </h3>
          {ramos.filter((ramo) => ramo.semestre === semester).map(renderButton)}
        </div>
      ))}
    </div>
  );
};

export default Malla;
