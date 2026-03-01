const {
  getLanguageById,
  submitBatch,
  submitToken,
} = require("./../utils/problemUtility");
const axios = require("axios");
const Problem = require("./../Models/problem");
const { findById } = require("../Models/user");

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

  try {
    for (const { language, completeCode } of referenceSolution) {
      // source_code
      // language_id
      // stdin:
      // output
      const languageId = getLanguageById(language);

      const submissions = visibleTestCases.map((testcase) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output,
      }));

      const submitResult = await submitBatch(submissions);

      const resultToken = submitResult.map((value) => value.token);
      const testResult = await submitToken(resultToken);

      for (const test of testResult) {
        if (test.status_id != 3) {
          return res.status(400).send("Error Occured");
        }
      }
    }
    // now everthing is fine then we store in db
    const userProblem = await Problem.create({
      ...req.body,
      problemCreator: req.user._id,
    });
    res.status(201).send("Problem saved successfully");
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};
const updateProblem = async (req, res) => {
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
  const { id } = req.params;

  try {
    if (!id) return res.status(400).send("Id Invalid");
    const IsCorrectId = await Problem.findById(id);
    if (!IsCorrectId) return res.status(404).send("Id not present in database");

    for (const { language, completeCode } of referenceSolution) {
      // source_code
      // language_id
      // stdin:
      // output
      const languageId = getLanguageById(language);

      const submissions = visibleTestCases.map((testcase) => ({
        source_code: completeCode,
        language_id: languageId,
        stdin: testcase.input,
        expected_output: testcase.output,
      }));

      const submitResult = await submitBatch(submissions);

      const resultToken = submitResult.map((value) => value.token);
      const testResult = await submitToken(resultToken);

      for (const test of testResult) {
        if (test.status_id != 3) {
          return res.status(400).send("Error Occured");
        }
      }
    }
    const newProblem =await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true,new:true});

    res.status(201).send(newProblem);
  } catch (err) {
    console.log(err.response?.data || err.message);
    res.status(500).send("Error"+err.message)
  }
};

const deleteProblem=async(req,res)=>{
  const {id}=req.params;
  try{
    if(!id) return res.status(500).send("Invalid Id");
    const isDeleted=await Problem.findByIdAndDelete(id);
    if(!isDeleted) return res.status(404).send("Problem is Missing")
      res.status(200).send("Deleted Successfully");
  }catch(err){
    res.status(500).send("Error"+err.message);
  }
} 

module.exports = { createProblem, updateProblem,deleteProblem };
