import { useState } from "react";
import CarreraSearch from "./CarreraSearch.jsx";

const CarreraContainer = ({ initialCarreras }) => {
  const [filteredCarreras, setFilteredCarreras] = useState(initialCarreras);

  const handleFilteredCarreras = (carreras) => {
    setFilteredCarreras(carreras);
  };

  return (
    <div className="w-full">
      {/* Componente de búsqueda y filtros */}
      <CarreraSearch 
        carreras={initialCarreras} 
        onFilteredCarreras={handleFilteredCarreras} 
      />

      {/* Grid de carreras */}
      <div className="flex flex-wrap gap-5 my-10 mx-2.5 justify-center min-h-[1110px] pb-[920px] min-[340px]:pb-[970px] min-[966px]:pb-[500px]">
        {filteredCarreras.length > 0 ? (
          filteredCarreras.map((carrera) => (
            <div key={carrera.id} className="rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-xl w-80">
              <div className="overflow-hidden relative h-full">
                <a
                  href={`/malla/${carrera.slug}`}
                  rel="noopener noreferrer"
                  className="text-white rounded"
                >
                  <img
                    src={carrera.url_image || "/placeholder-image.jpg"}
                    alt={`Imagen de la carrera ${carrera.nombre}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="bg-black bg-opacity-70 absolute bottom-0 w-full h-20 z-30 flex items-center justify-center">
                    <h3 className="text-lg font-bold text-center">{carrera.nombre}</h3>
                  </div>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-20">
            <div className="max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No se encontraron carreras
              </h3>
              <p className="text-gray-500">
                Intenta ajustar los filtros de búsqueda o seleccionar un departamento diferente.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarreraContainer;
