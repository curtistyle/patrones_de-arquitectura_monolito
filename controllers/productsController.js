const ProductModel = require("../models/ProductModel");
const pr = require("../pathRender");
const productModel = new ProductModel();

exports.getAll = async (req, res) => {
  try {
    const products = await productModel.getAll();
    res.render(pr.COMPONENTS.PRODUCTS.LIST, { products });
  } catch (error) {
    return res.status(500).json({ error: "Error al crear producto" });
  }
};

exports.create = async (req, res) => {
  const { name, price } = req.body;


  try {
    await productModel.createProduct({ name, price });
    res.redirect("/products");
  } catch (error) {
    return res.status(500).json({ error: "Error al crear producto" });
  }
};

exports.update = async (req, res) => {
  const { name, price } = req.body;
  const { id } = req.params;
  console.log(id);
  
  try {
    //await productModel.update({ name, price });
    const message = { 
      type: "success", 
      title: "Successful action",
      subtitle: "has been successfully registered in the database.",
      entity: product.name
    }
  
    const value = {
      product: {...product},
      message: {...message}
    }

    res.redirect(pr.COMPONENTS.PRODUCTS.UPDATE, value);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear producto" });
  }
};

exports.details = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.getById(id)
    res.render(pr.COMPONENTS.PRODUCTS.DETAILS, product );
  } catch (error) {
    return res.status(500).json({ error: "Error al mostrar detalle"})
  }
}

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await productModel.deleteProduct(id);
    res.redirect("/products");
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar producto" });
  }
};
