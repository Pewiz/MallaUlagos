import { useState, useEffect } from 'react';
import '../styles/malla.css'; 


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

    let buttonClass = '';
    if (isSelected) {
      buttonClass = 'selected';
    } else if (hasPrev) {
      buttonClass = 'prev';
    } else if (hasNext) {
      buttonClass = 'next';
    }

    return (
      <button key={ramo.nombre} className={buttonClass} onClick={() => handleClick(ramo)}>
        <span dangerouslySetInnerHTML={{ __html: insertHyphen(ramo.nombre) }} />
      </button>
    );
  };

  const semesters = ramos
    .map((ramo) => ramo.semestre)
    .filter((semestre, index, self) => self.indexOf(semestre) === index);

  if (isLoading) {
    return (
      <div className="loading-container pb-[920px] min-[611px]:pb-[700px] min-[966px]:pb-[500px]">
        <div className="spinner"></div>
      </div>
    );
  }

  if (ramos.length === 0) {
    return (
      <div className=" h-[1500px] flex flex-col gap-10 items-center justify-center text-center pb-[920px] min-[611px]:pb-[700px] min-[611px]:h-[1300px] min-[966px]:pb-[500px] min-[966px]:h-[1100px] ">
        <p className="text-xl font-semibold text-gray-600">Estamos trabajando para integrar la malla de tu carrera 💪</p>
        <img className='rounded-md' src="/catComputer.gif" alt="cat at computer" />
      </div>
    );
  }
  return (
    <div className="malla-grid min-h-[1100px] pb-[920px] min-[611px]:pb-[700px] min-[966px]:pb-[500px]">
      {semesters.map((semester) => (
        <div key={semester} className="semester-column">
          <h3>Semestre {semester}</h3>
          {console.log(import.meta.env.PUBLIC_API_URL)}
          {console.log(`${API_URL}/${carrera_id}`)}
          {ramos
            .filter((ramo) => ramo.semestre === semester)
            .map(renderButton)}
        </div>
      ))}
    </div>
  );
};

export default Malla;
