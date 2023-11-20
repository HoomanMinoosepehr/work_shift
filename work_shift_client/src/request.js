const baseUrl = 'http://localhost:3030/api/v1/';

export async function get(path) {
    const res = await fetch(baseUrl + path, { credentials: 'include' })
    return res.json()
};

export async function req(path, body, method) {
    const options = {
        method: method || 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    const res = await fetch(baseUrl + path, options);
    return res.json()
}