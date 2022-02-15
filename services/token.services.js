import { SecurityHelper } from '../helpers/security.helper.js';
import * as dotenv from 'dotenv';
import { RedisHelper } from '../helpers/redis.helper.js'

class TokenServices {

    constructor() {
        dotenv.config();
    }

    generateToken(){
        let minCharNumber = parseInt(process.env.MINCHAR);
        let maxCharNumber = parseInt(process.env.MAXCHAR);
        let encryptData = new SecurityHelper();
        let token = encryptData.getRandomToken(minCharNumber, maxCharNumber);
        return token.toString();
    }

    async saveToken(username, nocuenta, token, monto) {
        let encryptData = new SecurityHelper();
        let redis = new RedisHelper();
        let hashData = token.toString() + monto.toString();
        let hash = await encryptData.encryptData(hashData);

        let tokenModel = {
            username: username,
            cuenta: nocuenta,
            tokenStatus: "creado",
            hash: hash,
            timestamp: new Date()
        }

        console.log(hash);
        console.log(tokenModel);
        redis.set(hash, tokenModel);
    }
}

export { TokenServices };