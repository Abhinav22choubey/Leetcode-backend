const {
  getLanguageById,
  submitBatch,
  submitToken,
} = require("./../utils/problemUtility");
const axios = require("axios");
const Problem = require("./../Models/problem");

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

module.exports = createProblem;
