// var axios = require("axios");
import axios from "axios";

// const baseUrl = "http://127.0.0.1:5000";
const baseUrl = "https://210e-76-66-132-135.ngrok.io";

// RECIPIENTS

export const health = async () => {
  const response = await axios.get(baseUrl + "/health");
  return response.data;
};

export const getRecipient = async (id) => {
  const config = {
    method: "get",
    url: `${baseUrl}/recipient`,
    headers: {
      id: id,
    },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("ERROR");
  }
};

export const createRecipient = async (recipient) => {
  const config = {
    method: "post",
    url: `${baseUrl}/recipient`,
    headers: {
      "Content-Type": "application/json",
    },
    data: recipient,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("ERROR");
  }
};

export const updateRecipient = async (recipient) => {
  const config = {
    method: "put",
    url: `${baseUrl}/recipient`,
    headers: {
      "Content-Type": "application/json",
    },
    data: recipient,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("ERROR");
  }
};

export const deleteRecipient = async (id) => {
  const config = {
    method: "delete",
    url: `${baseUrl}/recipient`,
    headers: {
      id: id,
    },
  };
  try {
    const respone = await axios(config);
    return response.data;
  } catch (error) {
    console.log("ERROR");
  }
};

// GET ALL RECIPIENTS

export const getAllRecipients = async (userId) => {
  const config = {
    method: "get",
    url: `${baseUrl}/recipients/${userId}`,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("ERROR");
  }
};

// USERS

export const getUser = async (id) => {
  const config = {
    method: "get",
    url: `${baseUrl}/user`,
    headers: {
      id: id,
    },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("ERROR");
  }
};

export const createUser = async (id) => {
  const config = {
    method: "post",
    url: `${baseUrl}/user`,
    headers: {
      "Content-Type": "application/json",
    },
    data: { id: id },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addName = async (id, name) => {
  const config = {
    method: "patch",
    url: `${baseUrl}/user`,
    headers: {
      "Content-Type": "application/json",
    },
    data: { id, name },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// SAVE PRODUCT

export const saveProduct = async (productId, recipientId) => {
  const config = {
    method: "post",
    url: `${baseUrl}/saveProduct/${productId}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: { recipientId },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("ERROR");
  }
};

export const unsavedProduct = async (productId, recipientId) => {
  const config = {
    method: "delete",
    url: `${baseUrl}/saveProduct/${productId}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: { recipientId },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("ERROR");
  }
};

// COLLECTIONS

const getCollection = async (collectionId) => {
  const config = {
    method: "get",
    url: `${baseUrl}/collection`,
    headers: {
      id: collectionId,
    },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("ERROR");
  }
};

const createCollection = async (collection) => {
  const config = {
    method: "post",
    url: `${baseUrl}/collection`,
    headers: {
      "Content-Type": "application/json",
    },
    data: collection,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("ERROR");
  }
};

const updateCollection = async (collection) => {
  const config = {
    method: "put",
    url: `${baseUrl}/collection`,
    headers: {
      "Content-Type": "application/json",
    },
    data: collection,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("ERROR");
  }
};

const deleteCollection = async (collectionId) => {
  const config = {
    method: "delete",
    url: `${baseUrl}/collection`,
    headers: {
      id: collectionId,
    },
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("ERROR");
  }
};

// GET ALL COLLECTIONS

const getAllCollections = async (recipientId) => {
  const config = {
    method: "get",
    url: `${baseUrl}/collections/${recipientId}`,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("ERROR");
  }
};
