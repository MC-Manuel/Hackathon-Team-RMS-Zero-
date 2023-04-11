let keyFilterList = [];
const ignore = ['bezirk_nr',
'gemeinde_name',
'bezirk_name',
'bfs_nr_gemeinde',
'andere',
'total',
'jahr',
'wahljahr',
'einwohner']

const setupKriterien = () => {
  const config = [
    {
      title: "Party",
      fields: partyStrengthJson.records[0].fields
    },
    {
      title: "End Energieverbrauch",
      fields: endEnergyConsumptionJson.records[0].fields
    },
    {
      title: "Elektrizitätsproduktion",
      fields: electricityproductionJson.records[0].fields
    }
  ]

  config.forEach((entry) => {
    kriterienField(entry.title, entry.fields);
  })
}

const addKriterie = (prop) => {
  keyFilterList.push(prop);
}

const deleteKriterie = (prop) => {
  console.log(keyFilterList);
  keyFilterList = keyFilterList.filter((e) => e !== prop)
}

const kriterienField = (title, fields) => {
  const container = document.getElementById("kriterien-sidebar");
  const kriterienField = document.createElement('div');
  kriterienField.setAttribute('class', 'cat-section');
  const titleh = document.createElement('h3');
  titleh.innerHTML = title;
  kriterienField.appendChild(titleh);
  
 
  for(let prop in fields) {
    if(ignore.includes(prop) || fields[prop] === undefined) {
      continue;
    }
    const labelNCheckboxDiv = document.createElement('div')
    const label = document.createElement('label');
    label.innerHTML = prop;
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.onclick = (e) => {
      if(e.target.checked) {
          addKriterie(prop);
          generateGemeindeListe();
      } else {
          deleteKriterie(prop);
          generateGemeindeListe();
          console.log(keyFilterList);
      }
    }


    labelNCheckboxDiv.appendChild(
      checkbox
    )
    labelNCheckboxDiv.appendChild(
      label
    )
    kriterienField.appendChild(
      labelNCheckboxDiv
    )
  }
  
  container.appendChild(kriterienField);
}