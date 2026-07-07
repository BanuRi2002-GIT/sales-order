// import axios from "axios";
// const BASE_URL = "/api/items";

const MOCK_ITEMS = [
  { itemCode: "ITM-001", description: "Wireless Mouse", price: 25.0 },
  { itemCode: "ITM-002", description: "Mechanical Keyboard", price: 85.0 },
  { itemCode: "ITM-003", description: "27in Monitor", price: 320.0 },
  { itemCode: "ITM-004", description: "USB-C Dock", price: 140.0 },
  { itemCode: "ITM-005", description: "Laptop Stand", price: 45.0 },
  { itemCode: "ITM-006", description: "Webcam 1080p", price: 60.0 },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Once the backend is live, replace with: const { data } = await axios.get(BASE_URL); return data;
export async function fetchItems() {
  await delay(200);
  return MOCK_ITEMS;
}
