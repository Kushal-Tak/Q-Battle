/* CODE COMPLEXITY O(n) */


// To fetch battles.json file
let data = require('./battles.json');

// Variables declared for most_Active fields
let active_Attacker="";
let active_Defender="";
let active_region="";
let active_name="";

// Variables declared for Attacker Win/Loss count
let win = 0;
let loss = 0;

// Variables declared for Defender Size
let min = 0;
let max = 0;
let avg = 0;

// Contain all unique battle type in array
let battle_type = [];



async function getResult() {

  let count = 0;            
  data.map(async (element) => {

  if (element.defender_size != null) {
    count =  defenderSize(count, element);
  }
  await mostActive(element);
  await attackerOutcome(element);
  await battleType(element);
  })

  avg = count / data.length;  // average of Defender Size
}


let mostActive = async (element) => {
  active_Attacker = mostFreq(element.attacker_king);
  active_Defender = mostFreq(element.defender_king);
  active_region   = mostFreq(element.region);
  active_name     = mostFreq(element.name);
}


let mostFreq= (word) => {

  let active_count = {};
  let compare = 0;
  let mostFrequent="";

  // ---Logic to get most frequent element-- START
  if(active_count[word] === undefined){
      active_count[word] = 1;
  }else{
      active_count[word] = active_count[word] + 1;
  }
  if(active_count[word] > compare){
        compare = active_count[word];
        mostFrequent = word;
  }
  // ---Logic to get most frequent element-- END

  return mostFrequent;
}


let attackerOutcome = async (element) => {
  if (element.attacker_outcome == "win")
    win++;
  else
    loss++;
}


let defenderSize = (count, element) => {
  
  // ---Logic to get max and min element-- START
  if (min == 0 && max == 0) {
    min = element.defender_size;
    max = element.defender_size;
  }
  else {
    if (min > element.defender_size)
      min = element.defender_size;

    if (max < element.defender_size)
      max = element.defender_size;
  }
  // ---Logic to get max and min element-- END
  count += element.defender_size;
  return count;

}

let battleType = async element => {

  if (!battle_type.includes(element.battle_type) && element.battle_type != "")
    battle_type.push(element.battle_type);
}


let createOutput = async () => {
  let output = {
    'most_active':{
      'attacker_king': active_Attacker ,
      'defender_king': active_Defender,
      'region':active_region,
      'name':active_name
    },

    'attacker_outcome': {
      'win': win, // total win
      'loss': loss // total loss
    },
    'battle_type': battle_type, // unique battle types
    'defender_size': {
      'average': avg.toFixed(2),
      'min': min,
      'max': max
    }
  }
  return output;
}


async function displayOutput() {
  await getResult();
  let output = await createOutput();
  console.log(output);
}
displayOutput();







