import bcrypt from 'bcrypt';

class SecurityHelper {

    async encryptData(data) {
        
        //let salt = await bcrypt.genSalt(10);
        const salt = '$2b$10$X4kv7j5ZcG39WgogSl16au'
        let hashData = await bcrypt.hash(data, salt);
        
        return hashData;
    }

    getRandomToken(minCharNumber, maxCharNumber) {
        let charNumbers = maxCharNumber - minCharNumber;
        let charCount = parseInt(Math.random() * charNumbers) + minCharNumber;
        let maxNumber = parseInt("".padStart(charCount, "9"));
        let token = parseInt(Math.random() * maxNumber);

        if(token.toString().length < minCharNumber){
            token = token.toString().padStart(charCount, "0");
        } 
        
        if (this.validateToken(token) == false){
            this.getRandomToken(minCharNumber, maxCharNumber);
        } else {
            return token;
        }
    }

    validateToken(randomToken) {
        let validToken = true;
        let chars = randomToken.toString().split("(?!^)");
        let charNumbers = chars.length - 4;
        let counter = 0;
        for (let i = 0; i < charNumbers; i++){
            if(chars[counter] === chars[counter + 1] && chars[counter] === chars[counter + 2]){
                validToken = false;
                break;
            } 
        }
        return validToken;
    }

}

export { SecurityHelper };