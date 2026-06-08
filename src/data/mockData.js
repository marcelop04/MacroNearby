export const recomendaciones = [
  {
    id: 1,
    tipo: "Restaurante",
    nombre: "Menú Saludable 'El Huerto'",
    distancia: "150m",
    comida: "Almuerzo",
    descripcion:
      "Plato del día: Pollo a la plancha con arroz integral y ensalada.",
    macros: { kcal: 550, proteina: 45, carbohidratos: 60, grasas: 15 },
    precio: "S/ 15.00",
    match: "95%", // Filtro de conveniencia
  },
  {
    id: 2,
    tipo: "Supermercado",
    nombre: "Tambo / Mass",
    distancia: "50m",
    comida: "Snack",
    descripcion: "Compra un Yogur Griego natural + 30g de almendras.",
    macros: { kcal: 250, proteina: 15, carbohidratos: 10, grasas: 18 },
    precio: "S/ 8.50",
    match: "98%",
  },
  {
    id: 3,
    tipo: "Mercado Local",
    nombre: "Puesto Doña María",
    distancia: "300m",
    comida: "Desayuno",
    descripcion: "3 huevos sancochados y 1 plátano.",
    macros: { kcal: 310, proteina: 18, carbohidratos: 27, grasas: 15 },
    precio: "S/ 3.50",
    match: "90%",
  },
];

export const userMacros = {
  metaKcal: 2500,
  consumidasKcal: 1450,
  restantesKcal: 1050,
  proteinaRestante: 70, // gramos
  carbosRestantes: 110, // gramos
  grasasRestantes: 35, // gramos
};
