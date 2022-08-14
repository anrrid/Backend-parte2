import { prefixService } from '../daos/services/prefixService.js';

export default singUp = async (req, res, next) => {
    const prefixNumber = await prefixService ();
    res.render("/singup", {prefixNumber})
}