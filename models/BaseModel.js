const { Model } = require("sequelize");

class BaseModel extends Model {

    static formatDate(date) {
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
        ];
        
        const d = new Date(date);
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }

    static generateMultiplicationTable(n) {
        const table = [];
        
        for (let i = 1; i <= n; i++) {
            const row = [];
            for (let j = 1; j <= n; j++) { 
                if (i === j) {
                    row.push({ value: i * j, diagonal: true });
                } else if (i > j) {
                    row.push({ value: i * j, lower: true });
                } else {
                    row.push({ value: i * j, upper: false });
                }
            }
            table.push(row);
        }
        return table;
    }

    static paginate(data, page = 1, perPage = 10) {
        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / perPage);
        const currentPage = Math.max(1, Math.min(page, totalPages));
        const offset = (currentPage - 1) * perPage;
        const items = data.slice(offset, offset + perPage);

        return {
            items,
            pagination: {
                currentPage,
                totalPages,
                totalItems,
                perPage,
                hasNext: currentPage < totalPages,
                hasPrev: currentPage > 1,
            },
        };
    }

}

module.exports = BaseModel;