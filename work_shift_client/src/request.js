const baseUrl = 'http://127.0.0.1:3000/api/v1/';

export async function get(path) {
    const res = await fetch(baseUrl + path)
    return res.json()
};

export async function req(path, body, method) {
    const options = {
        method: method || 'POST',
        headers: {
            
        }
    }
}