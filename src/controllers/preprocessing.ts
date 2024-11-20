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
    "bundlepackageleaflet-en-49178f16170ee8a6bc2a4361c1748d5f": "processedbundledovato-en", //Dovato (eng)
    "bundlepackageleaflet-en-04c9bd6fb89d38b2d83eced2460c4dc1": "processedbundleflucelvax", // flucelvax
   // "bundlepackageleaflet-29436a85dac3ea374adb3fa64cfd2578": "processed-compositionaf8d2f6e4772c29a8ef9fbb165e80d28", // HIPERICO ARKOPHARMA
    "bundlepackageleaflet-en-dcaa4d32aa6658a8df831551503e52ee": "Processedbundlekarvea", // Karvea
    
    
    //Spanish TS ePIs
    "bundlepackageleaflet-es-94a96e39cfdcd8b378d12dd4063065f9": "bundleprocessed-es-b44cce291e466626afa836fffe72c350", // Biktarvy ES
    "bundlepackageleaflet-es-04c9bd6fb89d38b2d83eced2460c4dc1": "processedbundleflucelvaxES", // Flucelvax ES
    "bundlepackageleaflet-es-49178f16170ee8a6bc2a4361c1748d5f": "processedbundledovato-es", // Dovato ES
    "bundlepackageleaflet-es-925dad38f0afbba36223a82b3a766438": "processedbundlekarveacalcium", // Calcio ES

    "bundlepackageleaflet-es-2f37d696067eeb6daf1111cfc3272672": "bundlepackageleaflet-es-proc-2f37d696067eeb6daf1111cfc3272672", // tegretol
    "bundlepackageleaflet-en-2f37d696067eeb6daf1111cfc3272672": "bundlepackageleaflet-en-proc-2f37d696067eeb6daf1111cfc3272672",
    "bundlepackageleaflet-es-4fab126d28f65a1084e7b50a23200363": "bundlepackageleaflet-es-proc-4fab126d28f65a1084e7b50a23200363", // xenical
    "bundlepackageleaflet-en-4fab126d28f65a1084e7b50a23200363": "bundlepackageleaflet-en-proc-4fab126d28f65a1084e7b50a23200363",
    "bundlepackageleaflet-es-29436a85dac3ea374adb3fa64cfd2578": "processedbundlehypericum",

    "bundlepackageleaflet-es-da0fc2395ce219262dfd4f0c9a9f72e1": "bundlepackageleaflet-es-proc-da0fc2395ce219262dfd4f0c9a9f72e1",
    "bundlepackageleaflet-es-e762a2f54b0b24fca4744b1bb7524a5b": "bundlepackageleaflet-es-proc-e762a2f54b0b24fca4744b1bb7524a5b",

    "bundle-ibu-raw": "bundle-ibu-proc",
    "bundle-met-raw": "bundle-met-proc",
    "bundle-novo-raw": "bundle-novo-proc",

    // Portugal TS
    "PT-Glimepirida-Generis": "PT-Glimepirida-Generis-processed-bundle",
    "PT-Actrapid": "PT-Actrapid-processed-bundle",
    "PT-GLUCOPHAGE": "PT-GLUCOPHAGE-processed-bundle",
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
