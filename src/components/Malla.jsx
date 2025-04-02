import { useState, useEffect } from 'react';
import '../styles/malla.css'; 

const Malla = ({carrera_id}) => {
  const [ramos, setRamos] = useState([]);
  const [selectedRamos, setSelectedRamos] = useState(null);

  useEffect(() => {
    fetch(`/api/carreras/carreras/${carrera_id}`)
      .then((response) => response.json())
      .then((data) => setRamos(data.ramos));
  }, []);

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


  return (
    <div className="malla-grid min-h-[1100px] pb-[920px] min-[611px]:pb-[700px] min-[966px]:pb-[500px]">
      {semesters.map((semester) => (
        <div key={semester} className="semester-column">
          <h3>Semestre {semester}</h3>
          {
            ramos
            .filter((ramo) => ramo.semestre === semester)
            .map(renderButton)
          }
        </div>
      ))}
    </div>
  );
};

export default Malla;