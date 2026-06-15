import { useState, useRef } from "react";
import "./App.css";
import MacroTracker from "./components/MacroTracker";
import RadarOpciones from "./components/RadarOpciones";
import MiPerfil from "./components/MiPerfil";
import Comunidad from "./components/Comunidad";
import Login from "./components/Login"; // <-- Importamos tu Login
import { userMacros } from "./data/mockData";

function App() {
  // NUEVO: Estado para controlar si el usuario inició sesión
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [comidaActual, setComidaActual] = useState("Todas");
  const [vistaActual, setVistaActual] = useState("Radar");

  // Lógica para simular el deslizamiento (swipe) táctil en PC usando useRef
  const menuRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - menuRef.current.offsetLeft;
    scrollLeft.current = menuRef.current.scrollLeft;
  };

  const handleMouseLeave = () => { isDown.current = false; };
  const handleMouseUp = () => { isDown.current = false; };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault(); 
    const x = e.pageX - menuRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; 
    menuRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Función para renderizar la vista seleccionada del Dashboard
  const renderVista = () => {
    switch (vistaActual) {
      case "Radar":
        return (
          <>
            <MacroTracker macros={userMacros} />
            <div className="filtros-comida">
              <h3>¿Qué buscas comer ahora?</h3>
              <div className="botones-filtro">
                {["Todas", "Desayuno", "Almuerzo", "Cena", "Snack"].map(
                  (tipo) => (
                    <button
                      key={tipo}
                      className={comidaActual === tipo ? "btn activo" : "btn"}
                      onClick={() => setComidaActual(tipo)}
                    >
                      {tipo}
                    </button>
                  )
                )}
              </div>
            </div>
            <RadarOpciones comidaFiltro={comidaActual} />
          </>
        );
      case "Perfil":
        return <MiPerfil />;
      case "Comunidad":
        return <Comunidad />;
      case "Historial":
        return (
          <div className="panel">
            <h2>Historial de Comidas</h2>
            <p>Aquí se listarán las comidas registradas y recompensas ganadas.</p>
          </div>
        );
      default:
        return <RadarOpciones comidaFiltro={comidaActual} />;
    }
  };

  // VISTA DE AUTENTICACIÓN: Si no está logueado, centramos el contenedor de Login
  if (!isLoggedIn) {
    return (
      <div className="auth-container">
        <Login onLogin={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  // VISTA PRINCIPAL: Se ejecuta solo si isLoggedIn es true
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>MacroNearby</h2>
        <nav>
          <ul
            ref={menuRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <li
              className={vistaActual === "Radar" ? "active" : ""}
              onClick={() => setVistaActual("Radar")}
            >
              Radar Nutricional
            </li>
            <li
              className={vistaActual === "Perfil" ? "active" : ""}
              onClick={() => setVistaActual("Perfil")}
            >
              Mi Perfil
            </li>
            <li
              className={vistaActual === "Historial" ? "active" : ""}
              onClick={() => setVistaActual("Historial")}
            >
              Historial
            </li>
            <li
              className={vistaActual === "Comunidad" ? "active" : ""}
              onClick={() => setVistaActual("Comunidad")}
            >
              Comunidad
            </li>
            {/* Opcional: Botón para cerrar sesión */}
            <li className="logout-nav" onClick={() => setIsLoggedIn(false)}>
              Cerrar Sesión
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Tu Copiloto Nutricional</h1>
          <p>Ubicación actual: Ciudad Universitaria, UNMSM</p>
        </header>

        <section className="dashboard-grid">{renderVista()}</section>
      </main>
    </div>
  );
}

export default App;