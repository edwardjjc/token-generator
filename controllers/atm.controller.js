import { TokenServices } from '../services/token.services.js'

class ATM {

    constructor() {}

    async withdrawal(req, res) {
        const { token, monto } = req.body;
        let tokenS = new TokenServices();
        let result = await tokenS.validateToken(token, monto);
        res.status(200).send(result);
    }

}

export { ATM }