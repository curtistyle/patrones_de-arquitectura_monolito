const db = require("../db/Database").getDb(); // Obtener la instancia de la base de datos

class ProductoModel {
  getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
          reject("Error al obtener productos: " + err.message);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Método para agregar un producto
  createProduct({ name, price }) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO products (name, price) VALUES (?, ?)",
        [name, price],
        function (err) {
          if (err) {
            reject("Error al agregar producto: " + err.message);
          } else {
            resolve({ id: this.lastID, name, price });
          }
        }
      );
    });
  }

  // Metodo para obtener un producto por el ID
  getById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM products WHERE id = ?", [id], (err, product) => {
        if (err) {
          reject("Error no existe el producto: " + err.message);
        } else {
          resolve(product);
        }
      });
    })
  }
  
  
  // Método para eliminar un producto por ID
  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM products WHERE id = ?", [id], (err) => {
        if (err) {
          reject("Error al eliminar producto: " + err.message);
        } else {
          resolve({ id });
        }
      });
    });
  }
  
}


module.exports = ProductoModel;
