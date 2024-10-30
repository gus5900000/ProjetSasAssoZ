// Test pour l'affichage des lots avec un JSON
async function getAirtable() {
  let apiKey = ""
  let urlAPI = "https://api.airtable.com/v0/app1tMLBNyqLrKa1r/lots?view=Grid%20view"
  try {
    const reponse = await fetch(urlAPI, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    const resultat = await reponse.json();

    let tabFiltrer = filtreRarete(resultat)

    displayLots(tabFiltrer)
  } catch (erreur) {
    console.error('Erreur:', erreur);
    return null;
  }
}


function displayLots(lots) {
  const container = document.getElementById("lots-container");
  container.innerHTML = "";

  /* Tri par ordre alphabétique
  lots = lots.sort((a,b) => a.nom_lot > b.nom_lot ? 1 : -1);
  */

  /*
  Tri par ordre chronologique (en réalité alphab également car date = string)
  */
 
  lots = lots.sort((a, b) => a.date_obtention < b.date_obtention ? 1 : -1);


  lots.forEach(lot => {
    let lotItem = document.createElement("section");
    lotItem.classList.add("item");
    lotItem.innerHTML = `
      <div class ="desc"> 
        <h3 class="nomLot">${lot.fields.nom_lot}</h3>      
        <h3 class="date" >Date ouverture : ${lot.fields.date_obtention}</h3>
        <h3 class="rarete">Type de boîte : ${lot.fields.rarete_caisse}</h3>
        <h3 class="valeur">Valeur du lot : ${lot.fields.prix} €</h3>
      </div>   
        <img src="${lot.fields.photo_lot}" alt="${lot.fields.nom_lot}" class="lot">
      `;
    container.appendChild(lotItem);
  });
}


// Fonction filtre ne fonctionne pas pour l'instant, à retravailler () --> OK

// voir pour utiliser .filter() --> X

function filtreRarete(lots) {
  const rareteSelect = document.getElementById("filtre_rarete").value;
  const lotsFiltre = []
  lots["records"].forEach(lot => {
    if (rareteSelect === "Tous") {
      lotsFiltre.push(lot);
    }
    else if (lot.fields.rarete_caisse === rareteSelect) {
      lotsFiltre.push(lot);
    }
  })
  return lotsFiltre
  // displayLots(lotsFiltre);
}



document.getElementById("filtre_rarete").addEventListener("change", getAirtable);
// document.addEventListener("DOMContentLoaded", loadLots);
document.addEventListener("DOMContentLoaded", getAirtable);