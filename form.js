export const initForm = () => {
    const form = document.getElementById('movie-form');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const title = document.getElementById('movie-title').value;
        searchMovie(title);
    })
}


document.getElementById("resetBtn").addEventListener("click", function () {
    deletTable()
});


// const searchCastByMovieId = async (movieId) => {
//     const searchUrl = `https://api.tvmaze.com/shows/${movieId}/cast`;
//     fetch(searchUrl)
//         .then(result => {
//             if (!result.ok) {
//                 throw new Error('Nincsen válasz, HIBA!' + result.statusText);
//             }
//             return result.json();
//         })
//         .then(data => {
//             const myCast = data.map(item => [item.person.name || "N/A"]);
//             console.log(myCast[0]);
//             return myCast[0];
//         })
//         .catch(error => {
//             console.error('Probléma van a FETCH-el:', error);
//         });
// }
// Ez lett volna külön egy színész kereső. 


const searchMovie = async (title) => {
    const searchUrl = `https://api.tvmaze.com/search/shows?q=${title}`
    fetch(searchUrl)
        .then(result => {
            if (!result.ok) {
                throw new Error('Nincsen válasz, HIBA!' + result.statusText);
            }
            return result.json();
        })
        .then(data => {
            const myMovie = data.map(item => [item.show.id || "N/A", item.show.name || "N/A", item.show.premiered || "N/A", item.show.genres.length > 0 ? item.show.genres.join(", ") : "N/A", item.show.status || "N/A", item.show.ended || "N/A"
            ]);
            deletTable();
            createTableMovie(myMovie);
        })
        .catch(error => {
            console.error('Probléma van a FETCH-el:', error);
        });
}


const createTableMovie = async (data) => {
    const table = document.createElement("table");
    table.border = 1;
    const headerRow = document.createElement("tr");
    const headers = ["ID", "Title", "Relesed time", "Genres", "Status", "Ended"];

    headers.forEach(headerText => {
        const headerCell = document.createElement("th");
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    table.appendChild(headerRow);
    headerRow.className = "glow-border";
    headerRow.style.borderRadius = "5px";

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
    tableContainer.appendChild(table);
}

const deletTable = () => {
    const tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = ""
}

