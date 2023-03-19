import http from 'http'
import console from 'console'

export default function (drugInfo) {
  let parameter = (drugInfo.drugParameter === undefined) ? drugInfo.drugParameter : drugInfo.drugParameter.toLowerCase().trim();
  let baseURL = `https://api.fda.gov/drug/label.json?search=purpose:${drugInfo.drugName}`
  var options = {
    format: "json"
  }
  var response = http.getUrl(baseURL,options);
  if (parameter == undefined){
    let reqResponse = {
        activeingredient: response.results[0].active_ingredient,
        purpose: response.results[0].indications_and_usage,
        warnings: response.results[0].do_not_use,
        dosage: response.results[0].dosage_and_administration
    }
    return reqResponse;
  }
  else{
    if (parameter==="active ingredient"){  
      let reqResponse = {
        activeingredient: response.results[0].active_ingredient
      }
      reqResponse.params = true;
      console.log(reqResponse)
      return reqResponse;
    }
    if (parameter=="warnings"){
     let reqResponse = {
      warnings : response.results[0].do_not_use
      }
      reqResponse.params = true;
      console.log(reqResponse)
      return reqResponse;
    } 
    if (parameter=="purpose"){
     let reqResponse = {
      purpose : response.results[0].indications_and_usage
      }
      reqResponse.params = true;
      console.log(reqResponse)
      return reqResponse;
    } 
    if (parameter=="dosage" || parameter=="administration"){
     let reqResponse = {
      dosage : response.results[0].dosage_and_administration
      }
      reqResponse.params = true;
      console.log(reqResponse)
      return reqResponse;
    } 
  }
}