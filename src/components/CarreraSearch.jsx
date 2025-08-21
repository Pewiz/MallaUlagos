import { useState, useMemo } from "react";

const CarreraSearch = ({ carreras, onFilteredCarreras }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Extraer departamentos únicos de las carreras
  const departments = useMemo(() => {
    const uniqueDepartments = [
      ...new Set(carreras.map((carrera) => carrera.area)),
    ];
    return uniqueDepartments.sort();
  }, [carreras]);

  // Filtrar carreras basado en búsqueda y departamento
  const filteredCarreras = useMemo(() => {
    let filtered = carreras;

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (carrera) =>
          carrera.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          carrera.nombre_malla.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por departamento
    if (selectedDepartment) {
      filtered = filtered.filter(
        (carrera) => carrera.area === selectedDepartment
      );
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
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <div className="rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
          <div className="flex-1 w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar carrera..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="w-full sm:w-48 lg:w-64">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all duration-200 text-gray-700 bg-white cursor-pointer appearance-none text-sm sm:text-base"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 8px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "14px 14px",
              }}
            >
              <option value="">Todos los Departamentos</option>
              {departments.map((department) => (
                <option
                  key={department}
                  value={department}
                  className="rounded-lg"
                >
                  {department}
                </option>
              ))}
            </select>
          </div>

          {(searchTerm || selectedDepartment) && (
            <button
              onClick={clearFilters}
              className="px-2 sm:px-3 py-1.5 sm:py-2 bg-sky-100 hover:bg-sky-200 text-sky-800 rounded-md transition-all duration-200 font-medium flex items-center justify-center gap-1 whitespace-nowrap text-xs sm:text-sm border border-sky-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-3 h-3 sm:w-3.5 sm:h-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Limpiar</span>
            </button>
          )}
        </div>

        {/* Información de resultados */}
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs sm:text-sm text-gray-600">
          <div>
            Mostrando{" "}
            <span className="font-semibold text-blue-600">
              {filteredCarreras.length}
            </span>{" "}
            de <span className="font-semibold">{carreras.length}</span> carreras
          </div>

          {(searchTerm || selectedDepartment) && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  <span className="hidden sm:inline">Búsqueda:</span>
                  <span className="max-w-20 sm:max-w-none truncate">
                    "{searchTerm}"
                  </span>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1 text-blue-600 hover:text-blue-800 text-sm sm:text-base"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedDepartment && (
                <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  <span className="hidden sm:inline">Depto:</span>
                  <span>{selectedDepartment}</span>
                  <button
                    onClick={() => setSelectedDepartment("")}
                    className="ml-1 text-green-600 hover:text-green-800 text-sm sm:text-base"
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
