/**
 * Helper function to make fetch requests
 */
const makeRequest = async (url, options) => {
  const response = await fetch(url, options);
  const contentType = response.headers.get("content-type");
  const responseData =
    contentType && contentType.includes("application/json")
      ? await response.json()
      : await response.text();

  return { response, responseData };
};

module.exports = makeRequest;