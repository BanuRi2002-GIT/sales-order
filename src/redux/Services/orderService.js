// import axios from "axios";
// const BASE_URL = "/api/salesorders";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let MOCK_ORDERS = [
  {
    id: "o1",
    invoiceNo: "INV-2024-001",
    invoiceDate: "2024-07-15",
    referenceNo: "PO-8842",
    customerId: "c1",
    customerName: "Acme Corporation",
    address1: "221 Harbourview Road",
    address2: "Suite 4B",
    address3: "",
    city: "Colombo",
    state: "Western",
    postCode: "00300",
    lines: [
      { itemCode: "ITM-002", description: "Mechanical Keyboard", note: "", quantity: 10, price: 85, taxRate: 10 },
      { itemCode: "ITM-001", description: "Wireless Mouse", note: "", quantity: 30, price: 25, taxRate: 10 },
    ],
  },
  {
    id: "o2",
    invoiceNo: "INV-2024-002",
    invoiceDate: "2024-07-22",
    referenceNo: "GT-5541",
    customerId: "c2",
    customerName: "GlobalTech Industries",
    address1: "18 Innovation Drive",
    address2: "",
    address3: "",
    city: "Kandy",
    state: "Central",
    postCode: "20000",
    lines: [
      { itemCode: "ITM-003", description: "27in Monitor", note: "", quantity: 5, price: 320, taxRate: 10 },
      { itemCode: "ITM-004", description: "USB-C Dock", note: "", quantity: 5, price: 140, taxRate: 10 },
    ],
  },
  {
    id: "o3",
    invoiceNo: "INV-2024-003",
    invoiceDate: "2024-08-05",
    referenceNo: "PS-9901",
    customerId: "c3",
    customerName: "Pacific Solutions Pty Ltd",
    address1: "77 Marine Parade",
    address2: "Level 2",
    address3: "",
    city: "Galle",
    state: "Southern",
    postCode: "80000",
    lines: [
      { itemCode: "ITM-005", description: "Laptop Stand", note: "", quantity: 8, price: 45, taxRate: 10 },
      { itemCode: "ITM-006", description: "Webcam 1080p", note: "", quantity: 10, price: 60, taxRate: 10 },
    ],
  },
];

// Once the backend is live, swap these bodies for real axios calls, e.g.:
// export async function fetchOrders() { const { data } = await axios.get(BASE_URL); return data; }
export async function fetchOrders() {
  await delay(250);
  return MOCK_ORDERS;
}

export async function fetchOrderById(id) {
  await delay(150);
  const order = MOCK_ORDERS.find((o) => o.id === id);
  if (!order) throw new Error("Order not found");
  return order;
}

export async function createOrder(order) {
  await delay(300);
  const newOrder = { ...order, id: `o${MOCK_ORDERS.length + 1}-${Date.now()}` };
  MOCK_ORDERS = [...MOCK_ORDERS, newOrder];
  return newOrder;
}

export async function updateOrder(id, order) {
  await delay(300);
  MOCK_ORDERS = MOCK_ORDERS.map((o) => (o.id === id ? { ...order, id } : o));
  return { ...order, id };
}
