import './styles.scss';
import { initForm } from './form';

console.log('<--> Eddig működik.')

document.addEventListener('DOMContentLoaded', () => {
    initForm()
})

// fetch('https://api.tvmaze.com/search/shows?q=girls')
//     .then(result => {
//         if (!result.ok) {
//             throw new Error('Nincsen válasz, HIBA!' + result.statusText);
//         }
//         return result.json();
//     })
//     .then(data => {
//         console.log(data);
//         const movieName = data[0];
//         // if ((movieName.show.premiered.value) = (null)) {
//         //     movieName.show.premiered = ('ismeretlen dátum');
//         // };
//         console.log(`A(z) ${movieName.show.name} című film ${movieName.show.premiered}-án/én lett bemutatva. Műfaját tekintve ${movieName.show.genres}.`);
//     })
//     .catch(error => {
//         console.error('Probléma van a fetchel:', error);
//     });


