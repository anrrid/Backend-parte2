import productContainer from "../daos/services/productContainer.js";
import {loggerWarn, loggerTrace, loggerDefault, loggerError} from "../logger/log4js.js"

const product =  new productContainer();

export async function createProduct (req, res, next) {
    loggerTrace.trace("Run createProduct");
    if (req.body.stock === "") {
        loggerWarn.warn(`Stock ${req.body.stock}!!`);

        req.body.stock = 0;
    }

    const timestamp = new Date().toLocaleString();
    req.body.timestamp = timestamp;

    loggerDefault.info(req.body);

    try {
        loggerTrace.trace("run createProduct");
    const productCreated = await product.createProduct(req.body);
    // res.json({ msg: "Product Created!", product: productCreated });
    // res.render('./pages/agregar')
    res.redirect("/productos/agregar");
  } catch (error) {
    loggerError.error(error);
    res.json(error);
    }
    
}

export async function getAll (req, res) {
    loggerTrace.trace("Run getAll");
    try {
        const products = await product.getAllProducts()
        res.render("./pages/lista", {products})
    } catch (error) {
        loggerError.error(error);
        res.json(error)
    }
}

export async function getById (req, res,next) {
    loggerTrace.trace("Run getById");

    try {
        const id = req.params.id;
        loggerDefault.info(`Id: ${id}`);
        const getById = await product.getProduct(id)
        res.json(getById)
    } catch (error) {
        loggerError.error(error);
        res.json(error)
    }
};

export async function updateProduct (req, res,next) {
    loggerTrace.trace("Run updateProduct");

    try {
        const body = req.body;
        const id = req.params.id;
        const updateProduct = await product.updateProducts(id, body);
        loggerDefault.info("Update product " + updateProduct
        );
        res.json(updateProduct);

    } catch (error) {
        loggerError.error(error)
        res.json(error);
    }
};

export async function deleteById (req, res,next) {
    loggerTrace.trace("Run deleteById");

    try {
        const id = req.params.id;
        loggerDefault.info(`Id: ${id}`);
        await product.deleteProduct(id);
        res.json({msg: "Product deleted"})

    } catch (error) {
        loggerError.error(error)
        res.json(error);
    }
};

export async function getByTitle (req, res,next) {
    loggerTrace.trace("Run getByTitle");

    try {
        const title = req.params.title;
        loggerDefault.info(`Title: ${title}`);
        const getByTitle = await product.getProductByTitle(title)
        res.json(getByTitle)
    } catch (error) {
        loggerError.error(error);
        res.json(error)
    }
};

export async function getByCode (req, res,next) {
    loggerTrace.trace("Run getByCode");

    try {
        const code = req.params.code;
        loggerDefault.info(`Id: ${code}`);

        const getByCode = await product.getProductByTitle(title)
        res.json(getByCode);

    } catch (error) {
        loggerError.error(error)
        res.json(error);
    }
};

export async function getByPrice (req, res, next) {
    try {
        loggerDefault.info(`Price: min ${req.query.min} - max ${req.query.max}`);

        loggerDefault.info(req.query);

        if (req.query.min == undefined || req.query.max == undefined) {
            res.render("./pages/search-products")
        } else {
            const min = parseInt(req.query.min);
            const max = parseInt(req.query.max);
            const getByPrice = await product.getProductByPrice( min, max);

            res.render("./pages/products-finded", {getByPrice})
        }
    } catch (error) {
        loggerError.error(error)
        res.json(error);
    }
    
};

export async function getByStock (req, res, next) {
    loggerTrace.trace("Run getByStock")
    try {
        const min = parseInt(req.query.min);
        const max = parseInt(req.query.max);
        loggerDefault.info(`Stock: ${min} - ${max}`);

        const getByStock = await product.getProductByStock( min, max);
        res.json(getByStock)
    } catch (error) {
        loggerError.error(error)
        res.json(error);
    }
    
}





