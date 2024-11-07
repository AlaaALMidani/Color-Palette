const express = require("express");
const router = express.Router();
const { ColorPaletteService } = require("../services/paletteService");

function checkToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "No authorization header found" });
    }
    const [scheme, token] = req.headers.authorization.split(" ");
    if (scheme !== "Bearer") {
        return res.status(401).json({ error: "Invalid authorization scheme" });
    }
    const [header, payload, signature] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    req.tokenPayload = decodedPayload;
    next();
}
router.use(checkToken)
router.get("/", (req, res) => {
    res.send(req.tokenPayload);
});
router.get("/generateNewPalette", async (req, res) => {
    res.send(await ColorPaletteService.generatePalette(req.tokenPayload.userID));
});
router.get('/back', async (req, res) => {
    res.send(await ColorPaletteService.undo(req.tokenPayload.userID));
})
router.get('/forward', async (req, res) => {
    res.send(await ColorPaletteService.doo(req.tokenPayload.userID));
})
router.get('/lockToggling', async (req, res) => {

    res.send(await ColorPaletteService.lockToggling(req.tokenPayload.userID, req.query.id));
})
router.get('/reset', async (req, res) => {
    res.send(await ColorPaletteService.reset(req.tokenPayload.userID))
})
module.exports = router;
