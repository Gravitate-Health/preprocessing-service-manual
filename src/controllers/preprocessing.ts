import { Response, Request } from "express";
import { Logger } from "../utils/Logger";
import axios from "axios";

const getLeaflet = (epi: any) => {
  let leafletSectionList = epi['entry'][0]['resource']['section'][0]['section']
  return leafletSectionList
}

const addSemmanticAnnotation = (leafletSectionList: any[]) => {
  let preprocessedSections: any = []
  leafletSectionList.forEach(section => {
    //Preprocessing goes in here
    // ADD TEST PREPROCESS
    console.log("Adding <samplePreprocessTag> tag");
    section['text']['div'] = `<samplePreprocessTagGMEJ><samplePreprocessTag55>${section['text']['div']}</samplePreprocessTagGMEJ></samplePreprocessTag55>`




    preprocessedSections.push(section)
  })
  return preprocessedSections
}

export const preprocess = async (req: Request, res: Response) => {
  let epi = req.body;
  let epiId = epi['id'] as string
  console.log(`Received ePI with Length: ${JSON.stringify(epi).length}`);
  Logger.logInfo('preprocessing.ts', 'preprocess', `queried /preprocess function with epi ID: ${epiId}`)

  //This preprocessors returns the manual preprocessed ePis.
  let axiosInstance = axios.create()

  let rawToPreprocessedIds: any = {

    // English general ePIs
    "bundlepackageleaflet-en-94a96e39cfdcd8b378d12dd4063065f9": "processedbundlekarveabik", // Biktarvy
    "bundlepackageleaflet-en-0ea7cb60ce178124a5eca40942ba8f42": "processedbundledovato-en", //Dovato (eng)
    "bundlepackageleaflet-en-04c9bd6fb89d38b2d83eced2460c4dc1": "processedbundleflucelvax", // flucelvax
   // "bundlepackageleaflet-29436a85dac3ea374adb3fa64cfd2578": "processed-compositionaf8d2f6e4772c29a8ef9fbb165e80d28", // HIPERICO ARKOPHARMA
    "bundlepackageleaflet-en-dcaa4d32aa6658a8df831551503e52ee": "Processedbundlekarvea", // Karvea
    
    //Spanish TS ePIs
    "bundlepackageleaflet-es-94a96e39cfdcd8b378d12dd4063065f9": "bundleprocessed-es-b44cce291e466626afa836fffe72c350", // Biktarvy ES
    "bundlepackageleaflet-es-04c9bd6fb89d38b2d83eced2460c4dc1": "processedbundleflucelvaxES", // Flucelvax ES
    "bundlepackageleaflet-es-f98744933a164dfc1d0bf89825ebfca1": "processedbundledovato-es", // Dovato ES
    "bundlepackageleaflet-es-dcaa4d32aa6658a8df831551503e52ee": "processedbundlekarveacalcium", // Calcio ES
    "bundlepackageleaflet-es-29436a85dac3ea374adb3fa64cfd2578": "processedbundlehypericum", // HIPERICO ARKOPHARMA ES
  }
  let preprocessedId = rawToPreprocessedIds[epiId]

  if (preprocessedId) {
    console.log(`Getting Preprocessed ePI with ID: ${preprocessedId}`);
    let preprocessedResponse = await axiosInstance.get(`${process.env.URL}/epi/api/fhir/Bundle/${preprocessedId}`)
    let preprocessedEpi = preprocessedResponse.data
    res.status(200).send(preprocessedEpi)
    return
  }

  res.status(200).send(epi);
  return
};
