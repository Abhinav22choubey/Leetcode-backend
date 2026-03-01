const {getLanguageById,submitBatch}= require("./../utils/problemUtility");
const axios = require('axios');
const createProblem = async (req, res) => {
 
    const {
      title,
      description,
      difficultyLevel,
      tags,
      visibleTestCases,
      invisibleTestCases,
      startCode,
      referenceSolution,
      problemCreator,
    } = req.body;

    try{

      for(const {language,completeCode} of referenceSolution){

        // source_code
        // language_id
        // stdin:
        // output
        const languageId=getLanguageById(language);
        
        const submissions=visibleTestCases.map((input,output)=>({
          source_code:completeCode,
          language_id: languageId,
          stdin:input,
          expected_output:output
        }));

        const submitResult=await submitBatch(submissions);

        

      }


    }catch(err){
      console.log(errr);
    }

};
