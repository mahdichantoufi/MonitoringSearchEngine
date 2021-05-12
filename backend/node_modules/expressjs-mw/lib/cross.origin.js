// 判断origin是否在域名白名单里
function isOriginAllowed(origin, allowedOrigin) {
    if (allowedOrigin instanceof Array) {
        for (let i = 0; i < allowedOrigin.length; i++) {
            if (isOriginAllowed(origin, allowedOrigin[i])) {
                return true;
            }
        }
        return false;
    } else if (typeof allowedOrigin == "string") {
        return origin === allowedOrigin;
    } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
    } else {
        return false;
    }
}

module.exports = {
    validUrl: () => {
        //url合法性判断
        let regEXP = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*(; lang=\S+)*$/;

        return (req, res, next) => {
            let reqOrigin = req.headers.origin
            let validUrl = regEXP.test(reqOrigin);
            if (validUrl) {
                next()
            } else {
                throw "Origin Url not valid"
            }
        }
    },
    allowedOrigin: (origin) => {
        return (req, res, next) => {
            let reqOrigin = req.headers.origin
            if (isOriginAllowed(reqOrigin, origin)) {
                res.header('Access-Control-Allow-Origin', reqOrigin);
                res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
                res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, x-access-token');
                res.header('Access-Control-Allow-Credentials', true);

                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.setHeader('Pragma', 'no-cache');
                res.setHeader('Expires', 0);
                next()
            } else {
                throw "Origin not allow"
            }
        }
    },
    allowedReferer: (origin) => {
        return (req, res, next) => {
            let reqReferer = req.headers.referer
            if (isOriginAllowed(reqReferer, origin)) {
                res.header('Access-Control-Allow-Origin', reqReferer);
                res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
                res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, x-access-token');
                res.header('Access-Control-Allow-Credentials', true);

                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.setHeader('Pragma', 'no-cache');
                res.setHeader('Expires', 0);
                next()
            } else {
                throw "Referer not allow"
            }
        }
    }
}