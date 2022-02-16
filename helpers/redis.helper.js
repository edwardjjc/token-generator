import Redis from "ioredis";
import * as dotenv from 'dotenv';

class RedisHelper {

    client;

    constructor(){
        dotenv.config();
        //console.log('debug', 'Datos configuracion Redis', process.env.REDIS_HOST);            
        //this.client = new Redis(this.redisConnection)
        this.client = new Redis({
            port: parseInt(process.env.REDIS_PORT),
            host: process.env.REDIS_HOST
        });
    }

    validateKey(key){
        return this.client.exists(key) == 1;
    }

    get(key) {
        try{
            return this.client.get(key);
        } catch(err) {
            console.log("error", err);
            return null;
        }
    }

    set(key, value){
        try{ 
            let expTime = parseInt(process.env.EXP_TIME)
            this.client.set(key, value, "ex", expTime);
        } catch(err) {
            console.log("error", err);
        }
    }

    del(key){
        try{
            this.client.del(key);
        } catch(err) {
            console.log("error", err);
        }
    }
}
export { RedisHelper };