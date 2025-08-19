import { useState, useMemo } from "react";

const CarreraSearch = ({ carreras, onFilteredCarreras }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Extraer departamentos únicos de las carreras
  const departments = useMemo(() => {
    const uniqueDepartments = [...new Set(carreras.map(carrera => carrera.area))];
    return uniqueDepartments.sort();
  }, [carreras]);

  // Filtrar carreras basado en búsqueda y departamento
  const filteredCarreras = useMemo(() => {
    let filtered = carreras;

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.filter(carrera =>
        carrera.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        carrera.nombre_malla.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por departamento
    if (selectedDepartment) {
      filtered = filtered.filter(carrera => carrera.area === selectedDepartment);
    }

    return filtered;
  }, [carreras, searchTerm, selectedDepartment]);

  // Notificar al componente padre sobre los cambios
  useMemo(() => {
    onFilteredCarreras(filteredCarreras);
  }, [filteredCarreras, onFilteredCarreras]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          
          {/* Buscador */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar carrera..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Filtro por Departamento */}
          <div className="w-full lg:w-64">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 bg-white cursor-pointer"
            >
              <option value="">Todos los Departamentos</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>

          {/* Botón Limpiar Filtros */}
          {(searchTerm || selectedDepartment) && (
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 font-medium flex items-center gap-2 whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Limpiar
            </button>
          )}
        </div>

        {/* Información de resultados */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-gray-600">
          <div>
            Mostrando <span className="font-semibold text-blue-600">{filteredCarreras.length}</span> de <span className="font-semibold">{carreras.length}</span> carreras
          </div>
          
          {(searchTerm || selectedDepartment) && (
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  Búsqueda: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedDepartment && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Depto: {selectedDepartment}
                  <button
                    onClick={() => setSelectedDepartment("")}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarreraSearch;
