const shortid = require('shortid');

async function handlecreateShortUrl(req, res) {

    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'URL is required' });
    const shortID = shortid(8);

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        viewHistory: []

    });

return res.json({id:shortID});



}
module.exports = {
    handlecreateShortUrl
}