const sequelize = require('../helpers/database/connectDatabase.js');
const { DataTypes, Model } = require('sequelize');
const Category = require('./Category.js');
const ProductImage = require('./ProductImage.js');
const slugify = require('slugify');

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Product',
  }
);
Product.prototype.makeSlug = function () {
  return slugify(this.name, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};
Product.addHook('beforeCreate', async function (product) {
  let index = 0;
  let slug = product.makeSlug();
  while (true) {
    if (index === 1) {
      slug = `${slug}-${index}`;
    }
    if (index > 1) {
      slug = slug.substring(0, slug.length - 1) + index;
    }
    const productCount = await Product.findAndCountAll({
      where: { slug: slug },
    });
    if (productCount.count === 0) {
      break;
    }

    index++;
  }
  product.slug = slug;
});

Product.belongsToMany(Category, {
  through: 'Product_categories',
  foreignKey: 'ProductId',
});
Category.belongsToMany(Product, {
  through: 'Product_categories',
  foreignKey: 'CategoryId',
});
Product.hasMany(ProductImage);
ProductImage.belongsTo(Product);

module.exports = Product;
