const axios = require("axios");

const getLanguageById = (lang) => {
  const language = {
    "c++": 105,
    "cpp": 105,
    "java": 91,
    "javascript": 97,
  };
  return language[lang.toLowerCase()];
};

const API_KEYS = [
  process.env.JUDGE0_KEY_1,
  process.env.JUDGE0_KEY_2,
  process.env.JUDGE0_KEY_3,
].filter(Boolean);

let index = 0;

const getNextKey = () => {
  const key = API_KEYS[index];
  index = (index + 1) % API_KEYS.length;
  return key;
};

const submitBatch = async (submissions) => {
  if (!API_KEYS.length) {
    throw new Error("No Judge0 API keys found in environment");
  }

  for (let i = 0; i < API_KEYS.length; i++) {
    const key = getNextKey();

    try {
      const response = await axios.request({
        method: "POST",
        url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
        params: {
          base64_encoded: "false",
        },
        headers: {
          "x-rapidapi-key": key,
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          submissions,
        },
      });

      return response.data;
    } catch (error) {
      const status = error.response?.status;

      if (status === 429 || status === 401) {
        continue;
      }

      throw error;
    }
  }

  throw new Error("All Judge0 API keys failed in submitBatch");
};

const submitToken = async (resultToken) => {
  if (!API_KEYS.length) {
    throw new Error("No Judge0 API keys found in environment");
  }

  const waiting = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  for (let k = 0; k < API_KEYS.length; k++) {
    const key = getNextKey();
    console.log(key);

    const fetchData = async () => {
      try {
        const response = await axios.request({
          method: "GET",
          url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
          params: {
            tokens: resultToken.join(","),
            base64_encoded: "false",
            fields: "*",
          },
          headers: {
            "x-rapidapi-key": key,
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          },
        });

        return response.data;
      } catch (error) {
        const status = error.response?.status;

        if (status === 429 || status === 401) {
          return null;
        }

        throw error;
      }
    };

    let attempts = 10;

    while (attempts > 0) {
      const result = await fetchData();

      if (!result) break;

      const done = result.submissions.every(
        (r) => r.status_id > 2
      );

      if (done) return result.submissions;

      await waiting(2000);
      attempts--;
    }
  }

  throw new Error("All Judge0 API keys failed in submitToken");
};

module.exports = {
  getLanguageById,
  submitBatch,
  submitToken,
};