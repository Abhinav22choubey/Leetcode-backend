const createProblem = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
};
