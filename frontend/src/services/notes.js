import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL || "/api/notes";

async function getAll() {
  const res = await axios.get(baseUrl);
  return res.data;
}

async function create(newObj) {
  const res = await axios.post(baseUrl, newObj);
  return res.data;
}

async function update(id, newObj) {
  const res = await axios.put(`${baseUrl}/${id}`, newObj);
  return res.data;
}
async function remove(id) {
  const res = await axios.delete(`${baseUrl}/${id}`);
  return res.data;
}

export default {
  getAll,
  create,
  update,
  remove,
};
