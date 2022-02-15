import { hash } from 'bcrypt';

class SecurityHelper {

    async encryptData(data) {
        
        let hashData = await hash(data, 10);
        
        return hashData;
    }

    getRandomToken(minCharNumber, maxCharNumber) {
        let charNumbers = maxCharNumber - minCharNumber;
        let charCount = parseInt(Math.random() * charNumbers) + minCharNumber;
        let maxNumber = parseInt("".padStart(charCount, "9"));
        let token = parseInt(Math.random() * maxNumber);
        if(token.toString().length < charCount - 3){
            this.getRandomToken(minCharNumber, maxCharNumber);
        } else if (this.validateToken(token) == false){
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