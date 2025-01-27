// const fetch = require("node-fetch");
require("dotenv").config();
const makeRequest = require("../src/support/makeRequest");

const BASE_URL = "https://api.trello.com/1";
const API_KEY = process.env.API_KEY;
const TOKEN = process.env.API_TOKEN;
let boardId;

describe("Trello API - Create Board", () => {
  it("should create a new board successfully", async () => {
    const boardName = "Test Board";
    const url = `${BASE_URL}/boards/?name=${encodeURIComponent(
      boardName
    )}&key=${API_KEY}&token=${TOKEN}`;

    const { response, responseData } = await makeRequest(url, {
      method: "POST",
      headers: { Accept: "application/json" },
    });
    boardId = responseData.id;

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");

    expect(responseData).toHaveProperty("id");
    expect(responseData).toHaveProperty("name", boardName);
    expect(responseData).toHaveProperty("url");

    if (boardId) {
      const deleteUrl = `${BASE_URL}/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;
      await makeRequest(deleteUrl, {
        method: "DELETE",
      });
    }
  });

  it("should handle invalid API key or token gracefully", async () => {
    const boardName = "Test Invalid API Key";
    const url = `${BASE_URL}/boards/?name=${encodeURIComponent(
      boardName
    )}&key=INVALID_KEY&token=INVALID_TOKEN`;

    const { response, responseData } = await makeRequest(url, {
      method: "POST",
      headers: { Accept: "application/json" },
    });

    expect(response.status).toBe(401);
    expect(responseData).toBe("invalid key");
  });
});

describe("Trello API - Get Board", () => {
  beforeEach(async () => {
    const boardName = "Test Board";
    const url = `${BASE_URL}/boards/?name=${encodeURIComponent(
      boardName
    )}&key=${API_KEY}&token=${TOKEN}`;

    const { response, responseData } = await makeRequest(url, {
      method: "POST",
      headers: { Accept: "application/json" },
    });
    if (response.status !== 200) {
      throw new Error("Failed to create board in beforeEach");
    }
    boardId = responseData.id;
  });

  afterEach(async () => {
    if (boardId) {
      const url = `${BASE_URL}/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;
      const { response } = await makeRequest(url, {
        method: "DELETE",
      });

      if (response.status !== 200) {
        console.warn("Failed to delete board in afterEach");
      }
    }
  });

  it("should return board details with valid status, headers, and body", async () => {
    const url = `${BASE_URL}/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;
    const { response, responseData } = await makeRequest(url, {
      method: "GET",
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");

    expect(responseData).toHaveProperty("id", boardId);
    expect(responseData).toHaveProperty("name");
    expect(responseData).toHaveProperty("shortUrl");
  });

  it("should throw an error when the API returns a failure response", async () => {
    const invalidBoardId = "invalidBoard123";
    const url = `${BASE_URL}/boards/${invalidBoardId}?key=${API_KEY}&token=${TOKEN}`;

    const { response, responseData } = await makeRequest(url, {
      method: "GET",
    });

    expect(response.status).toBe(400);
    expect(responseData).toBe("invalid id");
  });
});

describe("Trello API - Update Board", () => {
  beforeEach(async () => {
    const boardName = "Test Board";
    const url = `${BASE_URL}/boards/?name=${encodeURIComponent(
      boardName
    )}&key=${API_KEY}&token=${TOKEN}`;

    const { response, responseData } = await makeRequest(url, {
      method: "POST",
      headers: { Accept: "application/json" },
    });
    if (response.status !== 200) {
      throw new Error("Failed to create board in beforeEach");
    }
    boardId = responseData.id;
  });

  afterEach(async () => {
    if (boardId) {
      const url = `${BASE_URL}/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;
      const { response } = await makeRequest(url, {
        method: "DELETE",
      });

      if (response.status !== 200) {
        console.warn("Failed to delete board in afterEach");
      }
    }
  });

  it("should update the board successfully", async () => {
    const updates = { name: "Updated Board Name", desc: "Updated description" };
    const url = `${BASE_URL}/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;

    const { response, responseData } = await makeRequest(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updates),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(responseData).toHaveProperty("id", boardId);
    expect(responseData).toHaveProperty("name", updates.name);
    expect(responseData).toHaveProperty("desc", updates.desc);
  });
});

describe("Trello API - Delete Board", () => {
  beforeEach(async () => {
    const boardName = "Test Board";
    const url = `${BASE_URL}/boards/?name=${encodeURIComponent(
      boardName
    )}&key=${API_KEY}&token=${TOKEN}`;

    const { response, responseData } = await makeRequest(url, {
      method: "POST",
      headers: { Accept: "application/json" },
    });
    if (response.status !== 200) {
      throw new Error("Failed to create board in beforeEach");
    }
    boardId = responseData.id;
  });

  afterEach(async () => {
    if (boardId) {
      const url = `${BASE_URL}/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;
      const { response } = await makeRequest(url, {
        method: "DELETE",
      });

      if (response.status !== 200) {
        console.warn("Failed to delete board in afterEach");
      }
    }
  });

  it("should delete a board successfully", async () => {
    const url = `${BASE_URL}/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;

    const { response, responseData } = await makeRequest(url, {
      method: "DELETE",
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
  });

  it("should handle an invalid board ID gracefully", async () => {
    const invalidBoardId = "invalidBoard123";
    const url = `${BASE_URL}/boards/${invalidBoardId}?key=${API_KEY}&token=${TOKEN}`;

    const { response, responseData } = await makeRequest(url, {
      method: "DELETE",
    });

    expect(response.status).toBe(400);
    expect(responseData).toBe("invalid id");
  });
});
