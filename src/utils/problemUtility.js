const axios = require("axios");

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
    url: "https://judge0-extra-ce1.p.rapidapi.com/submissions/batch",
    params: {
      base64_encoded: "true",
    },
    headers: {
      "x-rapidapi-key": "912a0b38c6msh69c220d010664c7p1a38ccjsn6295a9d96cb3",
      "x-rapidapi-host": "judge0-extra-ce1.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      submissions
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return await fetchData();
};

module.exports = { getLanguageById, submitBatch };

// api
