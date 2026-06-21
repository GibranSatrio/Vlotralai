export default async function handler(req, res) {
    const { api, text, model, prompt } = req.query;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    if (!api) {
        return res.status(400).json({ error: 'Missing api parameter' });
    }

    const baseURL = 'https://api-nanzz.my.id/docs/api/ai';
    let url = '';
    const params = new URLSearchParams();

    switch (api) {
        case 'chat':
            url = `${baseURL}/chat-gpt.php`;
            params.append('text', text || '');
            params.append('model', model || 'chatgpt');
            break;
        case 'gemini':
            url = `${baseURL}/gemini.php`;
            params.append('text', text || '');
            break;
        case 'wormgpt':
            url = `${baseURL}/worm-gpt.php`;
            params.append('prompt', prompt || text || '');
            break;
        case 'uncensored':
            url = `${baseURL}/uncensored-ai.php`;
            params.append('text', text || '');
            break;
        default:
            return res.status(400).json({ error: 'Invalid api type' });
    }

    try {
        const response = await fetch(`${url}?${params.toString()}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Proxy error', details: error.message });
    }
}
