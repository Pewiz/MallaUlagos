import { useState, useEffect } from "react";
import "../styles/malla.css";

const Malla = ({ carreraId }) => {
  const [ramos, setRamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/carreras/carreras/${carreraId}`);
        
        // Verifica si la respuesta es HTML (error)
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Respuesta inesperada: ${text.substring(0, 100)}...`);
        }

        const data = await response.json();
        if (!data.ramos) {
          throw new Error('La propiedad "ramos" no existe en la respuesta');
        }

        setRamos(data.ramos);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [carreraId]);

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
      <button
        key={ramo.id}
        className={buttonClass}
        onClick={() => handleClick(ramo)}
      >
        <span dangerouslySetInnerHTML={{ __html: insertHyphen(ramo.nombre) }} />
      </button>
    );
  };

  // Obtener semestres únicos ordenados
  const semesters = [...new Set(ramos.map((ramo) => ramo.semestre))].sort();

  return (
    <div className="malla-grid">
      {console.log("ramos:  " + ramos.nombre)}
      {semesters.map((semestre) => (
        <div key={semestre} className="semester-column">
          <h3>Semestre {semestre}</h3>
          {ramos.filter((ramo) => ramo.semestre === semestre).map(renderButton)}
        </div>
      ))}
    </div>
  );
};

export default Malla;
