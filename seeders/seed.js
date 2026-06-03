require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const { syncDatabase, User } = require('../models');

const seed = async () => {
    try {

        console.log('Seeding database...');
        await syncDatabase();

        const existing = await User.findOne({ where: { username: 'admin' } });
        if (!existing) {
            await User.create({
                username: 'admin',
                email: 'admin@gmail.com',
                password: 'admin123',
                role: 'admin',
            });
            console.log('Admin user created (username: admin, password: admin123)');
        } else {
            console.log('Admin user already exists');
        }

        console.log('Database seeding completed.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seed();