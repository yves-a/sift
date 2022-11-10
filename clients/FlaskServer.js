import axios from "axios";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000",
  timeout: 1000,
});

async function getUser() {
  try {
    const response = await client.get("/recipient", {
      headers: {
        "Content-Type": "application/json",
        id: "57d98e3c-48f9-11ed-b603-dca90475cfb7",
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

getUser();
