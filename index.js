const url =
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";

const lecturaJson = async () => {
  const json = await leerJson(url);
  return json;
};

const leerJson = (param) => {
  return fetch(param).then((res) => res.json());
};

// Primer punto
lecturaJson().then((json) => {
  const tbody = document.getElementById("tbody1");

  for (let i = 0; i < json.length; i++) {
    let objeto = json[i];

    const tr = document.createElement("tr");
    if (objeto.squirrel == true) {
      tr.className = "table-danger";
    }
    tbody.appendChild(tr);

    const th = document.createElement("th");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");

    th.textContent = i + 1;
    tr.appendChild(th);

    let eventos = "";
    for (let j = 0; j < objeto.events.length; j++) {
      let evento = objeto.events[j];
      if (j == 0) {
        eventos += evento;
      } else {
        eventos += ", " + evento;
      }
    }

    td1.textContent = eventos;
    tr.appendChild(td1);

    td2.textContent = objeto.squirrel;
    tr.appendChild(td2);
  }
});

// Segundo punto
lecturaJson().then((json) => {
  const tbody = document.getElementById("tbody2");
  let esArdilla = 0;
  let noEsArdilla = 0;
  let palabrasE = [];
  let eventos = new Map();

  for (let i = 0; i < json.length; i++) {
    let objeto = json[i];

    for (let j = 0; j < objeto.events.length; j++) {
      let evento = objeto.events[j];
      if (palabrasE.includes(evento) == false) {
        palabrasE.push(evento);
      }
      let eventoSi = evento + 1;
      let eventoNo = evento + 0;

      if (objeto.squirrel == true) {
        if (eventos.has(eventoSi)) {
          eventos.set(eventoSi, eventos.get(eventoSi) + 1);
        } else {
          eventos.set(eventoSi, 1);
        }
        if (eventos.has(eventoNo) == false) {
          eventos.set(eventoNo, 0);
        }
      } else {
        if (eventos.has(eventoNo)) {
          eventos.set(eventoNo, eventos.get(eventoNo) + 1);
        } else {
          eventos.set(eventoNo, 1);
        }
        if (eventos.has(eventoSi) == false) {
          eventos.set(eventoSi, 0);
        }
      }
    }

    if (objeto.squirrel == true) {
      esArdilla += 1;
    } else {
      noEsArdilla += 1;
    }
  }

  for (let i = 0; i < palabrasE.length; i++) {
    evento = palabrasE[i];
    eventoSi = evento + 1;
    eventoNo = evento + 0;

    TP = parseFloat(eventos.get(eventoSi));
    FP = esArdilla - TP;
    FN = parseFloat(eventos.get(eventoNo));
    TN = noEsArdilla - FN;

    let num = TP * TN - FP * FN;
    let den = Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN));

    let MCC = num / den;

    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    const th = document.createElement("th");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");

    th.textContent = i + 1;
    tr.appendChild(th);

    td1.textContent = evento;
    tr.appendChild(td1);

    td2.textContent = MCC;
    tr.appendChild(td2);
  }
  sort();
});

function sort() {
  let tabla = document.getElementById("tabla2");
  let cambio = true;
  var filas;
  var cambiando;
  var x;
  var y;
  var i;
  var deberiaCambiar;
  while (cambio) {
    cambio = false;
    filas = tabla.rows;
    for (i = 1; i < filas.length - 1; i++) {
      deberiaCambiar = false;
      x = filas[i].getElementsByTagName("td")[1];
      y = filas[i + 1].getElementsByTagName("td")[1];
      if (Number(x.innerHTML) < Number(y.innerHTML)) {
        deberiaCambiar = true;
        break;
      }
    }
    if (deberiaCambiar) {
      filas[i].parentNode.insertBefore(filas[i + 1], filas[i]);
      cambio = true;
    }
  }
}
