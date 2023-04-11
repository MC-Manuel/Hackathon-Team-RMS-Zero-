let partyStrengthJson = {};
let electricityproductionJson = {};
let endEnergyConsumptionJson = {};
let communityJson = {};
let standardYear = "2020";


const onLoad = async () => {
  await fetchHandler()
  createCommunityJsonObjectBasedOnYear(undefined);
  setupKriterien();
  generateGemeindeListe();
}

const fetchHandler = async () => {
    /*partyStrengthJson = await fetchAPI('https://data.tg.ch/api/records/1.0/search/?dataset=sk-stat-9&rows=1000&sort=wahljahr');
    electricityproductionJson  = await fetchAPI('https://data.tg.ch/api/records/1.0/search/?dataset=div-energie-10&rows=1000&sort=jahr');
    endEnergyConsumptionJson  = await fetchAPI('https://data.tg.ch/api/records/1.0/search/?dataset=div-energie-5&rows=1000&sort=jahr');*/
    partyStrengthJson = await fetchAPI('./json/partyStrenth.json')
    electricityproductionJson = await fetchAPI('./json/electricityProduction.json')
    endEnergyConsumptionJson = await fetchAPI('./json/endEnergyConsumption.json')
}
function fetchAPI(url){
    return fetch(url)
    .then(data=>data.json())
    .then(res=>{return res})
}

function createCommunityJsonObjectBasedOnYear(yearin){
    let year = yearin;
    if(year === undefined)
      year = standardYear;
    communityJson = {};
    endEnergyConsumptionJson.records.forEach(key => {
        if (key.fields.jahr == year){
            var newEntry = key.fields.bfs_nr_gemeinde;
            communityJson = {
                ...communityJson,
                [key.fields.bfs_nr_gemeinde]: {
                    gemeinde_name: key.fields.gemeinde_name,
                    andere:key.fields.andere,
                    total:key.fields.total,
                    energiebezugsflaeche:key.fields.energiebezugsflaeche,
                    elektrizitaet:key.fields.elektrizitaet,
                    solarwaerme:key.fields.solarwaerme,
                    fernwaerme:key.fields.fernwaerme,
                    umweltwaerme:key.fields.umweltwaerme,
                    erdgas:key.fields.erdgas,
                    erdoelbrennstoffe:key.fields.erdoelbrennstoffe,
                    holzenergie:key.fields.holzenergie,

                }
                
            }
        }
    });
    electricityproductionJson.records.forEach(key => {
        if (key.fields.jahr == year){
            communityJson[key.fields.bfs_nr_gemeinde] = {
              ...communityJson[key.fields.bfs_nr_gemeinde],
              wasserkraft: key.fields.wasserkraft,
              biogasanlagen_abwasser: key.fields.biogasanlagen_abwasser,
              photovoltaik: key.fields.photovoltaik,
              biogasanlagen_landwirtschaft: key.fields.biogasanlagen_landwirtschaft,
              biogasanlagen_industrie: key.fields.biogasanlagen_industrie,
              kehricht: key.fields.kehricht,
              biomasse_holz: key.fields.biomasse_holz,
              wind: key.fields.wind,
              total: key.fields.total,
            };
        }
    });

    var wahljahr = year - (year % 4) 
    partyStrengthJson.records.forEach(key => {
        if (key.fields.wahljahr == wahljahr){
            communityJson[key.fields.bfs_nr_gemeinde] = {
              ...communityJson[key.fields.bfs_nr_gemeinde],
              edu: key.fields.edu,
              evp: key.fields.evp,
              svp: key.fields.svp,
              cvp: key.fields.cvp,
              fdp: key.fields.fdp,
              gp: key.fields.gp,
              sp: key.fields.sp,
              glp: key.fields.glp,
              bdp: key.fields.bdp,
            };
        }
    });
}