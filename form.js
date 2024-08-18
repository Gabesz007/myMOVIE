export const initForm = () => {
    const form = document.getElementById('movie-form');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const title = document.getElementById('movie-title').value;
        console.log(title);
        searchMovie(title);
    })
}


const searchMovie = (title) => {
    const searchUrl = `https://api.tvmaze.com/search/shows?q=${title}`
    fetch(searchUrl)
        .then(result => {
            if (!result.ok) {
                throw new Error('Nincsen válasz, HIBA!' + result.statusText);
            }
            return result.json();
        })
        .then(data => {
            // console.log(data);
            const myMovie = data.map(item => [item.show.name, item.show.premiered, item.show.genres]);
            console.log(myMovie)
            const movieName = data[0];

            createTable(myMovie)
            console.log(`A(z) ${movieName.show.name} című film ${movieName.show.premiered}-án/én lett bemutatva. Műfaját tekintve ${movieName.show.genres}.`);
        })
        .catch(error => {
            console.error('Probléma van a FETCH-el:', error);
        });
}


const data = [
    ["Név", "Kor", "Város"],
    ["Anna", "28", "Budapest", "xiii.kerület"],
    ["Béla", "34", "Szeged"],
    ["Csaba", "23", "Debrecen"]
];

const createTable = (data) => {

    // A táblázat létrehozása
    // Táblázat elem létrehozása
    const table = document.createElement("table");
    table.border = 1; // Táblázat határvonalak (nem kötelező)

    // Táblázat sorainak létrehozása
    data.forEach((rowData, rowIndex) => {
        const row = document.createElement("tr");

        rowData.forEach(cellData => {
            // Ha az első sorban járunk, hozzunk létre fejléc cellát
            const cell = document.createElement(rowIndex === 0 ? "th" : "td");
            cell.textContent = cellData;
            row.appendChild(cell);
        });

        table.appendChild(row);
    });
    
    const tableContainer = document.getElementById("table-container");
    const myTable = createTable(data);
    tableContainer.appendChild(myTable);

}

// A táblázat beszúrása a HTML dokumentumba

