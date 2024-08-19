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
            const myMovie = data.map(item => [item.show.name || "N/A", item.show.premiered || "N/A", item.show.genres.length > 0 ? item.show.genres.join(", ") : "N/A"
        ]);
            console.log(myMovie)
            const movieName = data[0];

            createTable(myMovie)
            console.log(`A(z) ${movieName.show.name} című film ${movieName.show.premiered}-án/én lett bemutatva. Műfaját tekintve ${movieName.show.genres}.`);
        })
        .catch(error => {
            console.error('Probléma van a FETCH-el:', error);
        });
}


const createTable = (data) => {
    // A táblázat létrehozása
    const table = document.createElement("table");
    table.border = 1; // Táblázat határvonalak (nem kötelező)

    // Fejléc sor hozzáadása
    const headerRow = document.createElement("tr");
    const headers = ["Filmcím", "Megjelenés ideje", "Műfaj"]; // Az állandó oszlopnevek

    headers.forEach(headerText => {
        const headerCell = document.createElement("th");
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    table.appendChild(headerRow); // Fejléc hozzáadása a táblázathoz
    headerRow.className = "glow-border";
    headerRow.style.borderRadius = "5px";

    // Táblázat sorainak létrehozása az adatok alapján
    data.forEach(rowData => {
        const row = document.createElement("tr");
        row.className = "glow-border";
        row.style.textAlign = "center";

        rowData.forEach(cellData => {
            const cell = document.createElement("td");
            cell.textContent = cellData;
            cell.className = "glow-border";
            row.appendChild(cell);
        });

        table.appendChild(row);
    });

    const tableContainer = document.getElementById("table-container");
    tableContainer.appendChild(table); // A táblázat hozzáadása a containerhez
}


