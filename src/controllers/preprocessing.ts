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
  console.log(`Received ePI with Length: ${JSON.stringify(epi).length}`);
  Logger.logInfo('preprocessing.ts', 'preprocess', `queried /preprocess function with epi ID: ${JSON.stringify(epi['id'])}`)

  //This preprocessors returns the manual preprocessed ePis.
  let axiosInstance = axios.create()

  let rawToPreprocessedIds = {
    "bundlepackageleaflet-2d49ae46735143c1323423b7aea24165": "Processedbundlekarvea",
  }
  let preprocessedId = rawToPreprocessedIds["bundlepackageleaflet-2d49ae46735143c1323423b7aea24165"]

  if (preprocessedId) {
    console.log(`Getting Preprocessed ePI with ID: ${preprocessedId}`);
    let preprocessedResponse = await axiosInstance.get(`https://fosps.gravitatehealth.eu/epi/api/fhir/Bundle/${preprocessedId}`)
    let preprocessedEpi = preprocessedResponse.data
    res.status(200).send(preprocessedEpi)
    return
  }


  let leafletSectionList
  try {
    leafletSectionList = getLeaflet(epi)
  } catch (error) {
    res.status(400).send('Bad Payload')
    return
  }
  let annotatedSectionList
  try {
    annotatedSectionList = addSemmanticAnnotation(leafletSectionList)
  } catch (error) {
    res.status(500).send('Preprocessor error')
    return
  }
  epi['entry'][0]['resource']['section'][0]['section'] = annotatedSectionList
  console.log(`Returning ePI with Length: ${JSON.stringify(epi).length}`);
  res.status(200).send(epi);
  return
};
