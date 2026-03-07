const axios = require("axios");
const { eventNames } = require("../Models/user");

const getLanguageById = (lang) => {
  const language = {
    "c++": 105,
    java: 91,
    javascript: 97,
  };
  return language[lang.toLowerCase()];
};

const submitBatch = async (submissions) => {
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      base64_encoded: "false",
    },
    headers: {
      "x-rapidapi-key": process.env.JUDGE0_KEY,
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      submissions,
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return await fetchData();
};
const submitToken = async (resultToken) => {
  const options = {
    method: "GET",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      tokens: resultToken.join(","),
      base64_encoded: "false",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": process.env.JUDGE0_KEY,
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    },
  };
  async function fetchData() {
    try {
      const response = await axios.request(options);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  const waiting = async (timer) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timer);
    });
  };
  let i = 10;
  while (i > 0) {
    const result = await fetchData();
    const IsresultObtained = result.submissions.every((r) => r.status_id > 2);
    if (IsresultObtained) return result.submissions;
    await waiting(2000);
    i--;
  }
};

module.exports = { getLanguageById, submitBatch, submitToken };

// api
// resultToken.join(",")
