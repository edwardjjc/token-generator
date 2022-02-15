import { TokenServices } from '../services/token.services.js'

class TokenGenerator {

    constructor() {}

    generateToken(req, res) {
        const { username, noCuenta, monto } = req.body;
        let tokenS = new TokenServices();
        let token = tokenS.generateToken();
        res.status(200).send(token);
        tokenS.saveToken(username, noCuenta, token, monto);
    }

}

export { TokenGenerator }