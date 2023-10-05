import { csv } from 'd3';
import { bool, element } from 'prop-types';
import csvData from './deep_tmhmm_conflict_proteins_deployment_dataset.csv';

async function getData() {
  const data = await csv(csvData);
  return data;
}

const arrayStrConversion = str => {
  let newStr = str.replace(/'/g, '"');
  const array = JSON.parse(newStr);
  return array;
};

const getProteins = async () => {
  const proteinsData = [];
  const proteins = await getData();
  proteins.forEach(el => {
    const protein = {};
    protein.value = el['Entry'];
    protein.label = el['Entry name'];
    protein.description = el['Protein names'];
    protein.rawDSBdata = el['Disulfide bond']
    protein.disulfideBonds = arrayStrConversion(el['Disulfide bond'])
    protein.rawGLYdata = el.Glycosylation
    protein.glycoslation = arrayStrConversion(el.Glycosylation);
    // protein.length = parseInt(el['Length'], 10); // for topology
    // protein.topology = el['topology'];
    protein.length = parseInt(el['New_Length'], 10); // for orientation
    protein.topology = el['Orientation'];
    
    const domain = parseSequence(protein.topology, protein.length)
    protein.outsideDomain = domain.o
    protein.insideDomain = domain.i
    protein.rawSEQdata = el['Sequon list']

    let sequons = arrayStrConversion(el['Sequon list'])
    protein.totalSequons = sequons
    protein.sequons = findFreeSequons(sequons, protein.glycoslation)
    protein.rawCYSdata = el['Cysteine positions']
    
    let cysteines = arrayStrConversion(el['Cysteine positions'])
    protein.totalCysteines = cysteines
    cysteines = fixPosOffset(cysteines)
    protein.cysteines = findFreeCys(cysteines, protein.disulfideBonds)
    
    proteinsData.push(protein);
  });
  
  return proteinsData;
};

//special function for cysteines to fix the position (off by 1) issue
function fixPosOffset(cysteines){
  let cys = []
  for(let i = 0; i < cysteines.length; i++){
    let c = parseInt(cysteines[i]) + 1
    cys.push(c.toString())
  }
  return cys
}

/* Find free sequons in proteins
* Define free sequons as sequons that do not have a corresponding
  glycosylation bond
*/
function findFreeSequons(sequons, glycans){
  let freeSequons = []
  for(let i = 0; i < sequons.length; i++){
    let isSame = false
    for(let j = 0; j < glycans.length; j++){
      if(sequons[i] == glycans[j]){
        isSame = true
      }
    }
    if(!isSame){
      freeSequons.push(sequons[i])
    }
  }
  return freeSequons
}

/* Find free cysteines in proteins
* Define free cysteines as cysteine positions that do not have a corresponding
  disulfide bond
*/
function findFreeCys(cysteines, sulfides){
  let freeCysteines = []
  for(let i = 0; i < cysteines.length; i++){
    let isSame = false
    for(let j = 0; j < sulfides.length; j++){
      let sulfide = sulfides[j].split(" ")  
      if(cysteines[i] == sulfide[0] || cysteines[i] == sulfide[1]){
        isSame = true
      }
    }
    if(!isSame){
      freeCysteines.push(cysteines[i])
    }
  }
  return freeCysteines
}

/* 
Parse the topological sequence into an array thats easily accessible 
*/
function parseSequence(sequence, length){
  let newString = ''
  let start, end
  let outside = []
  let inside = []
  let pos = ''
  /* Object template
    {
        start_pos: start,
        end_pos: end
    }
  */

  for(let i = 0; i < sequence.length; i++){
    if(sequence[i] !== '-'){  
      if(sequence[i] === 'o'){
        pos = sequence[i]
        start = newString
        newString = "";
        if(start == null || start == ''){
          start = 0
        }
        if(i == sequence.length-1){//last character scenario  
          end = length
          let entry = {
            start_pos: start,
            end_pos: end
          }
          outside.push(entry)
        }
      }else if(sequence[i] === 'i'){
        pos = sequence[i]
        start = newString
        newString = "";
        if(start == null || start == ''){
          start = 0
        }
        if(i == sequence.length-1){//last character scenario
          end = length
          let entry = {
            start_pos: start,
            end_pos: end
          }
          inside.push(entry)
        }
      }else{
        newString += sequence[i]
      }
    }else{
      end = newString
      let entry = {
      start_pos: start,
      end_pos: end
      }
      if(pos === 'o'){
        outside.push(entry)
      }else{
        inside.push(entry)
      }
          
      newString = "";
    }
  }

  const domain = {o: outside, i: inside}
  return domain
}

export default { getProteins };