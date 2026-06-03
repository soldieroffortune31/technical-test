const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BaseModel = require('./BaseModel');

class Product extends BaseModel {
  
    getFormattedPrice() {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(this.price);
    }

    getDiscountedPrice(discountPercent) {
        if (discountPercent <= 0 || discountPercent >= 100) return this.price;
        return this.price - (this.price * discountPercent) / 100;
    }

    getStockStatus() {
        if (this.stock === 0) {
            return { label: 'Habis', class: 'danger' };
        } else if (this.stock <= 5) {
            return { label: 'Hampir Habis', class: 'warning' };
        } else if (this.stock <= 20) {
            return { label: 'Stok Terbatas', class: 'info' };
        } else {
            return { label: 'Tersedia', class: 'success' };
        }
    }

    static calculateTotalValue(products) {
        let total = 0;
        for (let i = 0; i < products.length; i++) {
            total += products[i].price * products[i].stock;
        }
        return total;
    }

  
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
            notEmpty: true,
            len: [2, 100],
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            defaultValue: 0,
            validate: {
            min: 0,
            },
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
            min: 0,
            },
        },
        category: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
    }
);

module.exports = Product;
