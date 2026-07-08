// // import axios from "axios";
// // const BASE_URL = "/api/clients";

// const MOCK_CLIENTS = [
//   {
//     id: "c1",
//     name: "Acme Corporation",
//     address1: "221 Harbourview Road",
//     address2: "Suite 4B",
//     address3: "",
//     city: "Colombo",
//     state: "Western",
//     postCode: "00300",
//   },
//   {
//     id: "c2",
//     name: "GlobalTech Industries",
//     address1: "18 Innovation Drive",
//     address2: "",
//     address3: "",
//     city: "Kandy",
//     state: "Central",
//     postCode: "20000",
//   },
//   {
//     id: "c3",
//     name: "Pacific Solutions Pty Ltd",
//     address1: "77 Marine Parade",
//     address2: "Level 2",
//     address3: "",
//     city: "Galle",
//     state: "Southern",
//     postCode: "80000",
//   },
// ];

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// // Once the backend is live, replace the body of each function with:
// // const { data } = await axios.get(BASE_URL); return data;
// export async function fetchClients() {
//   await delay(250);
//   return MOCK_CLIENTS.map(({ id, name }) => ({ id, name }));
// }

// export async function fetchClientById(id) {
//   await delay(150);
//   const client = MOCK_CLIENTS.find((c) => c.id === id);
//   if (!client) throw new Error("Client not found");
//   return client;
// }


// import axios from "axios";
// const BASE_URL = "/api/clients";

const MOCK_CLIENTS = [
  {
    id: "c1",
    name: "Acme Corporation",
    address1: "221 Harbourview Road",
    address2: "Suite 4B",
    address3: "",
    city: "Colombo",
    state: "Western",
    postCode: "00300",
  },
  {
    id: "c2",
    name: "GlobalTech Industries",
    address1: "18 Innovation Drive",
    address2: "",
    address3: "",
    city: "Kandy",
    state: "Central",
    postCode: "20000",
  },
  {
    id: "c3",
    name: "Pacific Solutions Pty Ltd",
    address1: "77 Marine Parade",
    address2: "Level 2",
    address3: "",
    city: "Galle",
    state: "Southern",
    postCode: "80000",
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Once the backend is live, replace the body of each function with:
// const { data } = await axios.get(BASE_URL); return data;
export async function fetchClients() {
  await delay(250);
  return MOCK_CLIENTS.map(({ id, name }) => ({ id, name }));
}

export async function fetchClientById(id) {
  await delay(150);
  const client = MOCK_CLIENTS.find((c) => c.id === id);
  if (!client) throw new Error("Client not found");
  return client;
}
