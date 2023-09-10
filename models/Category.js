const sequelize = require('../helpers/database/connectDatabase.js');
const { DataTypes, Model } = require('sequelize');
const slugify = require('slugify');

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Category',
  }
);

Category.prototype.makeSlug = function () {
  return slugify(this.name, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};
Category.addHook('beforeCreate', async function (category) {
  let index = 0;
  let slug = category.makeSlug();
  try {
    while (true) {
      if (index === 1) {
        slug = `${slug}-${index}`;
      }
      if (index > 1) {
        slug = slug.substring(0, slug.length - 1) + index;
      }
      const categories = await Category.findAndCountAll({
        where: { slug: slug },
      });

      if (categories.count === 0) {
        break;
      }

      index++;
    }
    category.slug = slug;
  } catch (err) {
    console.log(err);
  }
});

// const Category = sequelize.define('Category', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//     autoIncrement: true,
//     unique: true,
//   },
//   name: {
//     type: DataTypes.STRING(50),
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.STRING,
//   },
//   slug: {
//     type: DataTypes.STRING,
//   },
// });
// Category.associate = (models) => {
//   Category.belongsToMany(models.Product, {
//     foreignKey: 'CategoryId',
//   });
// };
// Category.belongsToMany(Product, {
//   foreignKey: 'CategoryId',
// });
module.exports = Category;
