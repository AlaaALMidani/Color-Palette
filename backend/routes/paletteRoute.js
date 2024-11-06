const express = require("express");
const router = express.Router();
const {
    Color,
    State,
    ColorPalette,
    ColorPaletteService,
} = require("../services/paletteService");

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

router.get("/", checkToken, (req, res) => {
    res.send(req.tokenPayload);
});
router.get("/generateNewPalette",checkToken, async (req, res) => {
    res.send(await ColorPaletteService.generatePallette(req.tokenPayload.userID));
});
 
module.exports = router;
