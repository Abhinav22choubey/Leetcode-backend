const Problem = require("../Models/problem");
const Submission = require("../Models/submissions");
const User = require("../Models/user");
const {
  getLanguageById,
  submitBatch,
  submitToken,
} = require("../utils/problemUtility");
const submitCode = async (req, res) => {
  try {
    const userId = req.user._id;
    const problemId = req.params.id;
    const { code, language } = req.body;
    // console.log(userId, problemId, code, language);
    if (!userId || !problemId || !code || !language)
      return res.status(400).send("Some Fields are missing");
    // Fetch the problem from database
    const problem = await Problem.findById(problemId);
    if (!problem) res.status(400).send("Problem not Found");
    // test case hidden

    // pehle submission store kar do
    const submittedResult = await Submission.create({
      userId,
      problemId,
      code,
      language,
      testCasePassed: 0,
      status: "pending",
      testCasesTotal: problem.invisibleTestCases.length,
    });

    const languageId = getLanguageById(language);

    const submissions = problem.invisibleTestCases.map((testcase) => ({
      source_code: code,
      language_id: languageId,
      stdin: testcase.input,
      expected_output: testcase.output,
    }));

    const submitResult = await submitBatch(submissions);
    const resultToken = submitResult.map((value) => value.token);
    const testResult = await submitToken(resultToken);
    let testCasePassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = "Accepted";
    let errorMessage = null;
    for (const test of testResult) {
      if (test.status_id == 3) {
        testCasePassed++;
        runtime += parseFloat(test.time || 0);
        memory = Math.max(memory, test.memory || 0);
      } else {
        if (test.status_id == 6) {
          status = "Compilation Error";
          errorMessage = test.compile_output;
        } else if (test.status_id == 5) {
          status = "Time Limit Exceeded";
        } else if (test.status_id == 4) {
          status = "Wrong Answer";
        } else {
          status = "Runtime Error";
          errorMessage = test.stderr;
        }
      }
    }
    // store the result in database in submission
    submittedResult.status = status;
    submittedResult.runtime = runtime;
    submittedResult.memory = memory;
    submittedResult.errorMessage = errorMessage;
    submittedResult.testCasePassed = testCasePassed;

    await submittedResult.save();
    console.log(submittedResult);

    // Problem id ko add karenge user schema me
    if (status == "Accepted" && !req.user.problemSolved.includes(problemId)) {
      req.user.problemSolved.push(problemId);
      await req.user.save();
    }

    res.status(201).send(submittedResult);
  } catch (err) {
    res.status(500).send("Internal Sever Error" + err.message);
  }
};

const runCode = async (req, res) => {
  try {
    const problemId = req.params.id;
    const { code, language } = req.body;
    if (!problemId || !code || !language)
      return res.status(400).send("Some Fields are missing");

    const problem = await Problem.findById(problemId);
    if (!problem) res.status(400).send("Problem not Found");

    const languageId = getLanguageById(language);

    const submissions = problem.visibleTestCases.map((testcase) => ({
      source_code: code,
      language_id: languageId,
      stdin: testcase.input,
      expected_output: testcase.output,
    }));
    const submitResult = await submitBatch(submissions);
    const resultToken = submitResult.map((value) => value.token);
    const testResult = await submitToken(resultToken);
    res.status(200).send(testResult);
  } catch (err) {
    res.status(500).send(" Error " + err.message);
  }
};
module.exports = { submitCode, runCode };
//  language_id: 91,
//     stdin: '10 20',
//     expected_output: '20',
//     stdout: '20\n',
//     status_id: 3,
//     created_at: '2026-03-03T16:49:53.822Z',
//     finished_at: '2026-03-03T16:49:54.338Z',
//     time: '0.046',
//     memory: 18192,
//     stderr: null,
//     token: '786a0468-c6f1-4b86-be3d-3ccdc5f4d4af',
//     number_of_runs: 1,
//     cpu_time_limit: '5.0',
//     cpu_extra_time: '1.0',
//     wall_time_limit: '10.0',
//     memory_limit: 256000,
//     stack_limit: 64000,
//     max_processes_and_or_threads: 128,
//     enable_per_process_and_thread_time_limit: false,
//     enable_per_process_and_thread_memory_limit: false,
//     max_file_size: 5120,
//     compile_output: null,
//     exit_code: 0,
//     exit_signal: null,
//     message: null,
//     wall_time: '0.054',
//     compiler_options: null,
//     command_line_arguments: null,
//     redirect_stderr_to_stdout: false,
//     callback_url: null,
//     additional_files: null,
//     enable_network: false,
