export default async function handler(req, res) {
    const { endpoint, ...params } = req.query;

    // 🟢 CORRECTED: Using your specific variable name
    const TOKEN = process.env.VITE_TMDB_KEY;
    const BASE_URL = "https://api.themoviedb.org/3";

    if (!endpoint) {
        return res.status(400).json({ error: "Endpoint is required" });
    }

    // Converts all params (page, query, region) into a URL string
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}/${endpoint}?${queryString}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TOKEN}`
            }
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
}