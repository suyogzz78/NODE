const shortid = require("shortid");
const URL = require('../models/url');
async function handlecreateShortUrl(req, res) {

    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'URL is required' });
    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        viewHistory: []

    });

    return res.render('homepage',{
        id:shortID,
        urls:await URL.find({})

    })





}

async function handlegetShortUrl(req, res) {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId: shortId },
        {
            $push: {
                viewHistory: { timestamp: Date.now() }
            }
        }
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectUrl);
}

async function handlegetAnalytics(req, res) {
    const shortID = req.params.shortId;

   const result =  await URL.findOne(
        {
            shortId: shortID
        }
    )
res.json({
    totalClicks : result.viewHistory.length,
    analytics : result.viewHistory,
})

}
module.exports = {
    handlecreateShortUrl,
    handlegetShortUrl,
    handlegetAnalytics
}