// ESERCIZIO 1: Media dei valori
function esercizio1() {
  console.log("=== ESERCIZIO 1 ===")
  const numeri = [10, 20, 30, 40]

  function calcolaMedia(arr) {
    let somma = 0
    for (let i = 0; i < arr.length; i++) {
      somma += arr[i]
    }
    return somma / arr.length
  }

  const media = calcolaMedia(numeri)
  console.log("Array:", numeri)
  console.log("Media:", media)
}

// ESERCIZIO 2: Valore al centro (o media dei due centrali)
function esercizio2() {
  console.log("\n=== ESERCIZIO 2 ===")
  const numeri = [1, 2, 3, 4, 5, 6, 7, 8]

  function valoreCentrale(arr) {
    const lunghezza = arr.length
    const centro = lunghezza / 2

    if (lunghezza % 2 === 0) {
      // Pari: media dei due centrali
      const val1 = arr[centro - 1]
      const val2 = arr[centro]
      return (val1 + val2) / 2
    } else {
      // Dispari: valore centrale
      return arr[Math.floor(centro)]
    }
  }

  console.log("Array:", numeri)
  console.log("Valore centrale:", valoreCentrale(numeri))

  // Test con array dispari
  const numeriDispari = [1, 2, 3, 4, 5]
  console.log("Array dispari:", numeriDispari)
  console.log("Valore centrale:", valoreCentrale(numeriDispari))
}

// ESERCIZIO 3: Contare quante volte compare 'a'
function esercizio3() {
  console.log("\n=== ESERCIZIO 3 ===")
  const lettere = ["a", "b", "a", "c", "a", "b"]

  function contaLettera(arr, lettera) {
    let contatore = 0
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === lettera) {
        contatore++
      }
    }
    return contatore
  }

  console.log("Array:", lettere)
  console.log("La lettera 'a' compare:", contaLettera(lettere, "a"), "volte")
}

// ESERCIZIO 4: Sconto del 15% se prezzo > 13
function esercizio4() {
  console.log("\n=== ESERCIZIO 4 ===")
  const prezzi = [9.99, 6.5, 12.2, 22.4, 32.9, 14.6, 31.5]

  function applicaSconto(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > 13) {
        arr[i] = arr[i] * 0.85 // sconto del 15%
      }
    }
  }

  console.log("Prezzi originali:", [9.99, 6.5, 12.2, 22.4, 32.9, 14.6, 31.5])
  applicaSconto(prezzi)
  console.log("Prezzi scontati:", prezzi)
}

// ESERCIZIO 5: Estrarre solo i nomi dei prodotti
function esercizio5() {
  console.log("\n=== ESERCIZIO 5 ===")
  const prodotti = [
    { nome: "penna", prezzo: 1 },
    { nome: "quaderno", prezzo: 3 },
    { nome: "zaino", prezzo: 20 },
  ]

  function estraiNomi(arr) {
    const nomi = []
    for (let i = 0; i < arr.length; i++) {
      nomi.push(arr[i].nome)
    }
    return nomi
  }

  const nomi = estraiNomi(prodotti)
  console.log("Prodotti:", prodotti)
  console.log("Nomi:", nomi)
}

// ESERCIZIO 6: Raggruppare libri per genere
function esercizio6() {
  console.log("\n=== ESERCIZIO 6 ===")
  const libri = [
    { titolo: "Il Signore degli Anelli", genere: "fantasy" },
    { titolo: "Dune", genere: "fantasy" },
    { titolo: "1984", genere: "distopico" },
    { titolo: "Fahrenheit 451", genere: "distopico" },
  ]

  function raggruppaPerGenere(arr) {
    const categorie = []

    for (let i = 0; i < arr.length; i++) {
      const libro = arr[i]
      let trovato = false

      // Cerco se il genere esiste già
      for (let j = 0; j < categorie.length; j++) {
        if (categorie[j].genere === libro.genere) {
          categorie[j].titoli.push(libro.titolo)
          trovato = true
          break
        }
      }

      // Se non trovato, creo una nuova categoria
      if (!trovato) {
        categorie.push({
          genere: libro.genere,
          titoli: [libro.titolo],
        })
      }
    }

    return categorie
  }

  const categorie = raggruppaPerGenere(libri)
  console.log("Categorie:", JSON.stringify(categorie, null, 2))
}

// ESERCIZIO 7: Trovare il prodotto più costoso
function esercizio7() {
  console.log("\n=== ESERCIZIO 7 ===")
  const prodotti = [
    { nome: "Laptop", prezzo: 900 },
    { nome: "Monitor", prezzo: 200 },
    { nome: "Mouse", prezzo: 25 },
  ]

  function trovaPiuCostoso(arr) {
    let piuCostoso = arr[0]
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].prezzo > piuCostoso.prezzo) {
        piuCostoso = arr[i]
      }
    }
    return piuCostoso
  }

  const piuCostoso = trovaPiuCostoso(prodotti)
  console.log("Prodotti:", prodotti)
  console.log("Prodotto più costoso:", piuCostoso)
}

// ESERCIZIO 8: Ordinare utenti per età
function esercizio8() {
  console.log("\n=== ESERCIZIO 8 ===")
  const utenti = [
    { nome: "Marta", eta: 30 },
    { nome: "Luca", eta: 22 },
    { nome: "Anna", eta: 25 },
  ]

  function ordinaPerEta(arr) {
    // Creo una copia per non modificare l'originale
    const copia = []
    for (let i = 0; i < arr.length; i++) {
      copia.push(arr[i])
    }

    // Bubble sort
    for (let i = 0; i < copia.length - 1; i++) {
      for (let j = 0; j < copia.length - 1 - i; j++) {
        if (copia[j].eta > copia[j + 1].eta) {
          const temp = copia[j]
          copia[j] = copia[j + 1]
          copia[j + 1] = temp
        }
      }
    }

    return copia
  }

  const ordinati = ordinaPerEta(utenti)
  console.log("Utenti originali:", utenti)
  console.log("Utenti ordinati:", ordinati)
}

// ESERCIZIO 9: Appiattire array nidificato
function esercizio9() {
  console.log("\n=== ESERCIZIO 9 ===")
  const nested = [1, [2, 3], [4, [5, 6]], 7]

  function appiattisci(arr) {
    const risultato = []

    function appiattisciRicorsivo(elemento) {
      if (Array.isArray(elemento)) {
        for (let i = 0; i < elemento.length; i++) {
          appiattisciRicorsivo(elemento[i])
        }
      } else {
        risultato.push(elemento)
      }
    }

    appiattisciRicorsivo(arr)
    return risultato
  }

  const appiattito = appiattisci(nested)
  console.log("Array nidificato:", nested)
  console.log("Array appiattito:", appiattito)
}

// ESERCIZIO 10: Calcolare media voti per studente
function esercizio10() {
  console.log("\n=== ESERCIZIO 10 ===")
  const studenti = [
    { nome: "Laura", voti: [30, 28, 27] },
    { nome: "Marco", voti: [18, 20, 22, 25] },
    { nome: "Irene", voti: [30] },
  ]

  function calcolaMediaVoti(arr) {
    const risultato = []

    for (let i = 0; i < arr.length; i++) {
      const studente = arr[i]
      let somma = 0

      for (let j = 0; j < studente.voti.length; j++) {
        somma += studente.voti[j]
      }

      let media = somma / studente.voti.length

      // Arrotondo a 2 decimali
      media = Math.round(media * 100) / 100

      risultato.push({
        nome: studente.nome,
        media: media,
      })
    }

    return risultato
  }

  const medie = calcolaMediaVoti(studenti)
  console.log("Studenti:", studenti)
  console.log("Medie:", medie)
}

// ESEGUO TUTTI GLI ESERCIZI
esercizio1()
esercizio2()
esercizio3()
esercizio4()
esercizio5()
esercizio6()
esercizio7()
esercizio8()
esercizio9()
esercizio10()

console.log("\n=== TUTTI GLI ESERCIZI COMPLETATI ===")
