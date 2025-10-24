import Product from "../models/Product.js";
import slugify from "slugify";

export const getAllProducts = async (req, res) => {
  const { filters = "default" } = req.query;
  let products;

  try {
    switch (filters) {
      case "asc":
        products = await Product.find().sort({ price: 1 });
        break;
      case "desc":
        products = await Product.find().sort({ price: -1 });
        break;
      case "default":
      default: {
        products = await Product.find();
      }
    }

    res.status(200).json(products);
    console.log(
      `Products fetched with filter: ${filters}, count: ${products.length}`
    );
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống" });
    console.error("Lỗi khi gọi getAllProducts", error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống" });
    console.error("Lỗi khi gọi getProductById", error);
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      discount,
      description,
      category,
      images,
      linkReview,
      status,
    } = req.body;
    const slug = slugify(name, { lower: true, strict: true, locale: "vi" });
    if (await Product.findOne({ slug })) {
      return res.status(400).json({ message: "Sản phẩm đã tồn tại." });
    }

    const product = new Product({
      name,
      slug,
      price,
      discount,
      description,
      category,
      images,
      linkReview,
      status,
    });
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống" });
    console.error("Lỗi khi gọi createProduct", error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      price,
      discount,
      description,
      category,
      images,
      linkReview,
      status,
    } = req.body;
    const productUpdated = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        discount,
        description,
        category,
        images,
        linkReview,
        status,
      },
      { new: true }
    );
    if (!productUpdated) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại." });
    }
    res.status(200).json(productUpdated);
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống" });
    console.error("Lỗi khi gọi updateProduct", error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productDeleted = await Product.findByIdAndDelete(id);
    if (!productDeleted) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại." });
    }
    res.status(200).json(productDeleted);
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống" });
    console.error("Lỗi khi gọi deleteProduct", error);
  }
};
