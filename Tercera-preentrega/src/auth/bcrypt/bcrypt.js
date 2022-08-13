import { hashSync, genSaltSync, compareSync } from "bcrypt";
const saltRounds = 12;


const createHash = (password) => {
    console.log('run bcrypt createHash')
    
    const passwordCripted = hashSync(password, genSaltSync(saltRounds), null);
    return passwordCripted;
}

const ValidPassword = (user, password) => {
    console.log('run bcrypt isValidPassword');
    const isValid = compareSync(user, password);
    console.log(isValid);
    return isValid;
}

export default { createHash, ValidPassword }