import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_BASE,
    timeout: 15000, // gemini can take a bit to respond
});

// ── Shopping List endpoints ──

export async function getItems(userId = 'default_user') {
    const { data } = await api.get(`/items?userId=${userId}`);
    return data;
}

export async function addItem(item) {
    const { data } = await api.post('/items', item);
    return data;
}

export async function updateItem(id, updates) {
    const { data } = await api.put(`/items/${id}`, updates);
    return data;
}

export async function deleteItem(id) {
    const { data } = await api.delete(`/items/${id}`);
    return data;
}

export async function deleteItemByName(name, userId = 'default_user') {
    const { data } = await api.delete(`/items/byname/${encodeURIComponent(name)}?userId=${userId}`);
    return data;
}

// ── Voice processing ──

export async function processVoiceCommand(transcript) {
    const { data } = await api.post('/voice/process', { transcript });
    return data;
}

// ── Suggestions ──

export async function getSuggestions(userId = 'default_user') {
    const { data } = await api.get(`/suggestions?userId=${userId}`);
    return data;
}

export async function getSubstitutes(itemName) {
    const { data } = await api.get(`/suggestions/substitutes/${encodeURIComponent(itemName)}`);
    return data;
}

// ── Catalogue ──

export async function getCatalogue(params = {}) {
    const queryStr = new URLSearchParams(params).toString();
    const { data } = await api.get(`/catalogue?${queryStr}`);
    return data;
}

export async function getCategories() {
    const { data } = await api.get('/catalogue/categories');
    return data;
}

