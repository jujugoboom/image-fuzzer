const allowedOrigins = ["https://image-fuzzer.now.sh", "https://image-fuzzer.jujugoboom.now.sh", "https://image.justincovell.com"]

export default function(req, res, next) {
    let origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin)
        res.setHeader('Vary', 'Origin')
    }
    next();
}