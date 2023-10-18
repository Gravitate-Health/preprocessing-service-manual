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
    "bundlepackageleaflet-63b15a3bb9d18a00ecd0962bc011c765": "processedbundlekarveabik", // Biktarvy
    "bundlepackageleaflet-925dad38f0afbba36223a82b3a766438": "processedbundlekarveacalcium", // Calcium
    "bundlepackageleaflet-6eb523b7a88cd6dcee848368833cbd08": "processedbundledovato-en", //Dovato (eng)
    "bundlepackageleaflet-56a32a5ee239fc834b47c10db1faa3fd": "processedbundleflucelvax", // flucelvax
    "bundlepackageleaflet-29436a85dac3ea374adb3fa64cfd2578": "processed-compositionaf8d2f6e4772c29a8ef9fbb165e80d28", // HIPERICO ARKOPHARMA
    "bundlepackageleaflet-2d49ae46735143c1323423b7aea24165": "Processedbundlekarvea",
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
