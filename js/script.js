const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// Feriados Nacionales Argentina
const feriados = [
    "0-1",   // Año Nuevo
    "1-16",  // Carnaval
    "1-17",  // Carnaval
    "2-24",  // Memoria por la Verdad y Justicia
    "3-2",   // Jueves Santo
    "3-3",   // Viernes Santo
    "3-2",   // Malvinas
    "4-1",   // Día del Trabajador
    "4-25",  // Revolución de Mayo
    "5-17",  // Paso a la Inmortalidad de Güemes
    "5-20",  // Día de la Bandera
    "6-9",   // Día de la Independencia
    "7-17",  // Paso a la Inmortalidad de San Martín
    "9-12",  // Día del Respeto a la Diversidad Cultural
    "10-23", // Día de la Soberanía Nacional
    "11-8",  // Inmaculada Concepción
    "11-25"  // Navidad
];

let currentDate = new Date();

function renderCalendar() {
    const monthElement = document.getElementById('month');
    const yearInput = document.getElementById('year-input');
    const datesElement = document.getElementById('dates');
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthElement.innerText = monthNames[month];
    yearInput.value = year;

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    let daysHTML = "";

    // Días mes anterior
    for (let i = firstDayIndex; i > 0; i--) {
        daysHTML += `<div class="calendar_item neighbor-month">${prevLastDate - i + 1}</div>`;
    }

    // Días mes actual
    for (let i = 1; i <= lastDate; i++) {
        const isToday = (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) ? "today" : "";
        
        // Verificar si es feriado
        const checkFeriado = `${month}-${i}`;
        const isHoliday = feriados.includes(checkFeriado) ? "holiday" : "";

        daysHTML += `<div class="calendar_item current-month ${isToday} ${isHoliday}">${i}</div>`;
    }

    // Rellenar hasta completar 42 celdas (sin espacios vacíos)
    const totalCells = 42;
    const nextDays = totalCells - (firstDayIndex + lastDate);
    for (let j = 1; j <= nextDays; j++) {
        daysHTML += `<div class="calendar_item neighbor-month">${j}</div>`;
    }

    datesElement.innerHTML = daysHTML;
}

// Cambiar año manualmente
document.getElementById('year-input').addEventListener('change', (e) => {
    const newYear = parseInt(e.target.value);
    if (!isNaN(newYear)) {
        currentDate.setFullYear(newYear);
        renderCalendar();
    }
});

// Navegación de meses
document.getElementById('prev-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();