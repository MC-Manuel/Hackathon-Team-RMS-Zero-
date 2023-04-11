const generateGemeindeListe = () => {
  console.log(communityJson);
  const wholeBox = document.getElementById('gemeinde-box');
  wholeBox.remove();

  const main = document.getElementById('main')
  const newWholeBox = document.createElement('div');

  newWholeBox.setAttribute('id', 'gemeinde-box');
  main.appendChild(newWholeBox);

  for(const gmeindeId in communityJson) {
    console.log()
    createOneGemeindeBox(gmeindeId);
  }
}


const createOneGemeindeBox = (id) => {
  const boxDiv = document.createElement('div');
  boxDiv.setAttribute('class', 'info-gmeinde-box')
  const gmeindeTitel = document.createElement('h2');
  gmeindeTitel.setAttribute('class', 'info-gemeinde-title');
  const infoDiv = document.createElement('div');
  infoDiv.setAttribute('class', 'info-gmeinde-info')
  console.log(id);


  gmeindeTitel.innerHTML = communityJson[id]["gemeinde_name"]; 
  
  for(let prop in communityJson[id]) {
    const title = document.createElement('h4');
    const oneInfo = document.createElement('div');
    const info = document.createElement('p');
    if(keyFilterList.includes(prop)) {
      info.innerHTML = communityJson[id][prop];
      title.innerHTML = prop;

      oneInfo.appendChild(
        title
      )
      oneInfo.appendChild(
        info
      )

      infoDiv.appendChild(
        oneInfo
      )
    }
  }

  boxDiv.appendChild(
    gmeindeTitel
  )
  boxDiv.appendChild(
    infoDiv
  )

  document.getElementById('gemeinde-box').appendChild(
    boxDiv
  )
}