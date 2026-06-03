const { Product } = require('../models');
const { Op } = require('sequelize');
const BaseController = require('./BaseController');

class ProductController extends BaseController {

    static async index(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const offset = (page - 1) * limit;
            const search = req.query.search || '';

            const whereClause = search
            ? {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { category: { [Op.like]: `%${search}%` } },
                ],
                }
            : {};

            const { count, rows: products } = await Product.findAndCountAll({
                where: whereClause,
                limit,
                offset,
                order: [['createdAt', 'DESC']],
            });

            const totalPages = Math.ceil(count / limit);
            const totalValue = Product.calculateTotalValue(products);

            res.render('products/index', {
                title: 'Manajemen Produk',
                products,
                totalValue,
                search,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems: count,
                    hasNext: page < totalPages,
                    hasPrev: page > 1,
                },
                error: req.flash('error'),
                success: req.flash('success'),
            });
        } catch (err) {
            this.handleError(req, res, err, 'Gagal memuat produk', '/dashboard');
        }
    }

    static showCreate(req, res) {
        res.render('products/create', {
            title: 'Tambah Produk',
            error: req.flash('error'),
        });
    }

    static async create(req, res) {
        try {
            const { name, description, price, stock, category } = req.body;

            if (!name || !price) {
                req.flash('error', 'Nama dan harga wajib diisi');
                return res.redirect('/products/create');
            }

            await Product.create({
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock) || 0,
                category,
            });

            req.flash('success', `Produk "${name}" berhasil ditambahkan`);
            res.redirect('/products');
        } catch (err) {
            this.handleError(req, res, err, 'Gagal menambahkan produk', '/products/create');
        }
    }

    static async show(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);

            if (!product) {
                req.flash('error', 'Produk tidak ditemukan');
                return res.redirect('/products');
            }

            res.render('products/show', {
                title: product.name,
                product,
                stockStatus: product.getStockStatus(),
                formattedPrice: product.getFormattedPrice(),
                error: req.flash('error'),
                success: req.flash('success'),
            });
        } catch (err) {
            this.handleError(req, res, err, 'Gagal memuat produk', '/products');
        }
    }

    // READ - Show edit form
    static async showEdit(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);

            if (!product) {
                req.flash('error', 'Produk tidak ditemukan');
                return res.redirect('/products');
            }

            res.render('products/edit', {
                title: 'Edit Produk',
                product,
                error: req.flash('error'),
            });
        } catch (err) {
            this.handleError(req, res, err, 'Gagal memuat produk', '/products');;
        }
    }

    static async update(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);

            if (!product) {
                req.flash('error', 'Produk tidak ditemukan');
                return res.redirect('/products');
            }

            const { name, description, price, stock, category } = req.body;

            await product.update({
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock) || 0,
                category,
            });

            req.flash('success', `Produk "${name}" berhasil diupdate`);
            res.redirect('/products/' + product.id);
        } catch (err) {
            console.error(err);
            this.handleError(req, res, err, 'Gagal mengupdate produk', '/products/' + req.params.id + '/edit');
        }
    }

    static async destroy(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);

            if (!product) {
                req.flash('error', 'Produk tidak ditemukan');
                return res.redirect('/products');
            }

            const name = product.name;
            await product.destroy();

            req.flash('success', `Produk "${name}" berhasil dihapus`);
            res.redirect('/products');
        } catch (err) {
            this.handleError(req, res, err, 'Gagal menghapus produk', '/products');
        }
    }
}

module.exports = ProductController;
