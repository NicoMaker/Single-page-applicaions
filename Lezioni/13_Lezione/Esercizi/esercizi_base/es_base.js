// 1) Media dei valori
let numeri = [10, 20, 30, 40];

function calcolaMedia(arr) {
  let somma = 0;
  for (let i = 0; i < arr.length; i++) {
    somma += arr[i];
  }
  return somma / arr.length;
}

console.log("Media:", calcolaMedia(numeri));

// 2) Valore centrale
let numeri2 = [1, 2, 3, 4, 5, 6];

function valoreCentrale(arr) {
  let meta = Math.floor(arr.length / 2);
  if (arr.length % 2 === 0) {
    return (arr[meta - 1] + arr[meta]) / 2;
  } else {
    return arr[meta];
  }
}

console.log("Valore centrale:", valoreCentrale(numeri2));

// 3) Conta lettere 'a'
let lettere = ["a", "b", "a", "c", "a", "b"];

function contaLettera(arr, lettera) {
  let conta = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === lettera) {
      conta++;
    }
  }
  return conta;
}

console.log("La 'a' compare:", contaLettera(lettere, "a"), "volte");

// 4) Sconto 15%
let prezzi = [9.99, 6.5, 12.2, 22.4, 32.9, 14.6, 31.5];

function applicaSconto(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 13) {
      arr[i] = arr[i] * 0.85;
      arr[i] = arr[i].toFixed(2);
    }
  }
}

applicaSconto(prezzi);
console.log("Prezzi scontati:", prezzi);

// 5) Nomi prodotti
let prodotti = [
  { nome: "penna", prezzo: 1 },
  { nome: "quaderno", prezzo: 3 },
  { nome: "zaino", prezzo: 20 },
];

function estraiNomi(arr) {
  let nomi = [];
  for (let i = 0; i < arr.length; i++) {
    nomi[i] = arr[i].nome;
  }
  return nomi;
}

console.log("Nomi:", estraiNomi(prodotti));

// 6) Raggruppa per genere
const libri = [
  { titolo: "Il Signore degli Anelli", genere: "fantasy" },
  { titolo: "Dune", genere: "fantasy" },
  { titolo: "1984", genere: "distopico" },
  { titolo: "Fahrenheit 451", genere: "distopico" },
];

function raggruppaPerGenere(arr) {
  let categorie = [];
  let numCategorie = 0;

  for (let i = 0; i < arr.length; i++) {
    let trovato = false;
    let indiceTrovato = -1;

    for (let j = 0; j < numCategorie; j++) {
      if (categorie[j].genere === arr[i].genere) {
        trovato = true;
        indiceTrovato = j;
        break;
      }
    }

    if (trovato) {
      let vecchiTitoli = categorie[indiceTrovato].titoli;
      let nuoviTitoli = [];
      for (let k = 0; k < vecchiTitoli.length; k++) {
        nuoviTitoli[k] = vecchiTitoli[k];
      }
      nuoviTitoli[vecchiTitoli.length] = arr[i].titolo;
      categorie[indiceTrovato].titoli = nuoviTitoli;
    } else {
      categorie[numCategorie] = {
        genere: arr[i].genere,
        titoli: [arr[i].titolo],
      };
      numCategorie++;
    }
  }

  return categorie;
}

console.log("Categorie:", raggruppaPerGenere(libri));

// 7) Prodotto più costoso
const prodotti2 = [
  { nome: "Laptop", prezzo: 900 },
  { nome: "Monitor", prezzo: 200 },
  { nome: "Mouse", prezzo: 25 },
];

function trovaPiuCostoso(arr) {
  let costoso = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].prezzo > costoso.prezzo) {
      costoso = arr[i];
    }
  }
  return costoso;
}

console.log("Più costoso:", trovaPiuCostoso(prodotti2));

// 8) Ordina per età
const utenti = [
  { nome: "Marta", eta: 30 },
  { nome: "Luca", eta: 22 },
  { nome: "Anna", eta: 25 },
];

function ordinaPerEta(arr) {
  let copia = [];
  for (let i = 0; i < arr.length; i++) {
    copia[i] = arr[i];
  }
  for (let i = 0; i < copia.length - 1; i++) {
    for (let j = 0; j < copia.length - 1 - i; j++) {
      if (copia[j].eta > copia[j + 1].eta) {
        let temp = copia[j];
        copia[j] = copia[j + 1];
        copia[j + 1] = temp;
      }
    }
  }
  return copia;
}

console.log("Ordinati:", ordinaPerEta(utenti));

// 9) Appiattisci array
const nested = [1, [2, 3], [4, [5, 6]], 7];

function appiattisci(arr) {
  let flat = [];
  let indice = 0;

  function elabora(elemento) {
    for (let i = 0; i < elemento.length; i++) {
      if (Array.isArray(elemento[i])) {
        elabora(elemento[i]);
      } else {
        flat[indice] = elemento[i];
        indice++;
      }
    }
  }

  elabora(arr);
  return flat;
}

console.log("Appiattito:", appiattisci(nested));

// 10) Media voti
const studenti = [
  { nome: "Laura", voti: [30, 28, 27] },
  { nome: "Marco", voti: [18, 20, 22, 25] },
  { nome: "Irene", voti: [30] },
];

function calcolaMediaVoti(arr) {
  let risultati = [];
  for (let i = 0; i < arr.length; i++) {
    let totale = 0;
    for (let j = 0; j < arr[i].voti.length; j++) {
      totale += arr[i].voti[j];
    }
    let media = Math.round((totale / arr[i].voti.length) * 100) / 100;
    risultati[i] = { nome: arr[i].nome, media: media };
  }
  return risultati;
}

console.log("Risultati:", calcolaMediaVoti(studenti));
