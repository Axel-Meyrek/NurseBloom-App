export const formulas = [
    {
        id: 1,
        name: "Regla de tres: dosificación de medicamentos",
        description: "Procedimiento matemático para calcular la cantidad exacta de fármaco que se debe administrar, se basa en dosis prescrita.",
        formula: "(Dosis indicada × Volumen de dilución) / Presentación",
        exercises: [
            {
                question: "El médico indica 250 mg de Amoxicilina. La presentación es de 500 mg en 5 mL. ¿Cuántos mL administrar?",
                options: ["1.5 mL", "2.5 mL", "5 mL", "10 mL"],
                correct: "2.5 mL"
            },
            {
                question: "Se indica 15 mg de Metoclopramida. La ampolleta trae 10 mg en 2 mL. ¿Cuántos mL administrar?",
                options: ["2 mL", "3 mL", "4 mL", "1 mL"],
                correct: "3 mL"
            }
        ]
    },
    {
        id: 2,
        name: "Cálculo de goteo (Micro goteo)",
        description: "Se utiliza principalmente en el área de pediatría o cuando se requiere una infusión de soluciones muy precisa y lenta.",
        formula: "Volumen (mL) / Tiempo (horas) = microgotas/min",
        exercises: [
            {
                question: "Solución salina 100 mL en 4 horas. ¿Cuántas microgotas por minuto?",
                options: ["15", "20", "25", "30"],
                correct: "25"
            },
            {
                question: "Pasar 250 mL de Solución Mixta en 6 horas. ¿Cuántas microgotas por minuto?",
                options: ["30", "42", "50", "25"],
                correct: "42"
            }
        ]
    },
    {
        id: 3,
        name: "Cálculo de goteo (Macro goteo)",
        description: "Sirve para determinar cuántas gotas por minuto deben pasar por un equipo de venoclisis para administrar una solución en un tiempo determinado.",
        formula: "Volumen (mL) / (Tiempo en horas × 3) = gotas/min",
        exercises: [
            {
                question: "Pasar 1,000 mL de Solución salina en 8 horas. ¿Cuántas gotas por minuto?",
                options: ["30", "42", "21", "60"],
                correct: "42"
            },
            {
                question: "Administrar 500 mL de Solución Glucosada en 12 horas. ¿Cuántas gotas por minuto?",
                options: ["10", "14", "20", "7"],
                correct: "14"
            }
        ]
    },
    {
        id: 4,
        name: "Índice de Masa Corporal (IMC)",
        description: "Un indicador simple de la relación entre el peso y la talla que se utiliza para identificar sobrepeso y obesidad.",
        formula: "Peso (kg) / [Estatura (m)]²",
        classification: [
            { range: "18.5 – 24.9", label: "Peso normal" },
            { range: "25.0 – 29.9", label: "Sobrepeso" },
            { range: "30.0 – 34.9", label: "Obesidad I" },
            { range: "35.0 – 39.9", label: "Obesidad II" }
        ],
        exercises: [
            {
                question: "Paciente con peso de 75 kg y mide 1.70 m. ¿Cuál es su IMC?",
                options: ["22.5", "25.9", "30.1", "28.4"],
                correct: "25.9"
            },
            {
                question: "Paciente con peso de 60 kg y mide 1.65 m. ¿Cuál es su IMC?",
                options: ["20", "22", "24", "26"],
                correct: "22"
            }
        ]
    },
    {
        id: 5,
        name: "Balance hídrico",
        description: "Cuantificación y comparación de los ingresos y egresos de líquidos de un paciente.",
        formula: "Total de Ingresos - Total de Egresos",
        exercises: [
            {
                question: "Paciente con ingresos de 2,000 mL y egresos de 1,500 mL. ¿Cuál es el balance?",
                options: ["-500 mL", "+500 mL", "+250 mL", "0 mL"],
                correct: "+500 mL"
            },
            {
                question: "Paciente con ingresos de 1,200 mL y egresos de 1,800 mL. ¿Cuál es el balance?",
                options: ["-600 mL", "+600 mL", "-300 mL", "0 mL"],
                correct: "-600 mL"
            }
        ]
    },
    {
        id: 6,
        name: "Gasto Urinario (diuresis horaria)",
        description: "Evalúa la función renal: mL producidos por kilo de peso en una hora.",
        formula: "Volumen de orina (mL) / Peso (kg) / Tiempo (horas)",
        classification: [
            { label: "Normal", range: "0.5 a 1 mL/kg/hr" },
            { label: "Oliguria", range: "menor a 0.5 mL/kg/hr" },
            { label: "Poliuria", range: "3 mL/kg/hr" },
            { label: "Anuria", range: "0.2 mL/kg/hr" }
        ],
        exercises: [
            {
                question: "Paciente de 70 kg orinó 400 mL en 6 horas. ¿Gasto urinario?",
                options: ["0.5 mL/kg/hr", "0.95 mL/kg/hr", "1.2 mL/kg/hr", "0.3 mL/kg/hr"],
                correct: "0.95 mL/kg/hr"
            },
            {
                question: "Paciente de 80 kg orinó 150 mL en 5 horas. ¿Gasto urinario?",
                options: ["0.37 mL/kg/hr", "0.5 mL/kg/hr", "0.8 mL/kg/hr", "0.2 mL/kg/hr"],
                correct: "0.37 mL/kg/hr"
            }
        ]
    },
    {
        id: 7,
        name: "Presión Arterial Media (PAM)",
        description: "Presión promedio en las arterias durante un ciclo cardíaco completo.",
        formula: "[Presión Sistólica + (2 × Presión Diastólica)] / 3",
        exercises: [
            {
                question: "Paciente con TA de 120/80 mmHg. ¿Cuál es la PAM?",
                options: ["90", "93.3", "100", "85"],
                correct: "93.3"
            },
            {
                question: "Paciente con TA de 90/60 mmHg. ¿Cuál es la PAM?",
                options: ["60", "70", "75", "80"],
                correct: "70"
            }
        ]
    },
    {
        id: 8,
        name: "Superficie Corporal",
        description: "Usado para dosis específicas (quimioterapias) o ajuste de fluidos en quemados.",
        formula: "√[(Peso (kg) × Talla (cm)) / 3600]",
        exercises: [
            {
                question: "Paciente mide 160 cm y pesa 65 kg. ¿Superficie corporal?",
                options: ["1.50 m²", "1.70 m²", "1.90 m²", "2.00 m²"],
                correct: "1.70 m²"
            },
            {
                question: "Paciente mide 180 cm y pesa 90 kg. ¿Superficie corporal?",
                options: ["1.85 m²", "2.12 m²", "2.30 m²", "2.50 m²"],
                correct: "2.12 m²"
            }
        ]
    },
    {
        id: 9,
        name: "Cálculo de pérdidas insensibles",
        description: "Líquido perdido no medible a simple vista (sudor, respiración).",
        formula: "Peso (kg) × 0.5 × Tiempo (horas)",
        exercises: [
            {
                question: "Paciente de 60 kg en un turno de 8 horas. ¿Pérdidas?",
                options: ["100 mL", "240 mL", "300 mL", "150 mL"],
                correct: "240 mL"
            },
            {
                question: "Paciente de 85 kg en un periodo de 12 horas. ¿Pérdidas?",
                options: ["400 mL", "510 mL", "600 mL", "350 mL"],
                correct: "510 mL"
            }
        ]
    },
    {
        id: 10,
        name: "Conversión de temperatura (C a F)",
        description: "Conversión de grados Celsius a Fahrenheit.",
        formula: "(°C × 1.8) + 32",
        exercises: [
            {
                question: "Convertir 39.5°C a Fahrenheit.",
                options: ["100°F", "103.1°F", "105°F", "102.5°F"],
                correct: "103.1°F"
            },
            {
                question: "Convertir 37°C a Fahrenheit.",
                options: ["97.5°F", "98.6°F", "99.2°F", "100°F"],
                correct: "98.6°F"
            }
        ]
    }
];
