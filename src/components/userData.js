// userData.js
const userData = {
    // User information
    userInfo: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '••••••••',
    },

    // User addresses
    addresses: [
        {
            id: 1,
            type: 'Home',
            street: '123 Main Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            zip: '400001',
            isDefault: true,
        },
        {
            id: 2,
            type: 'Office',
            street: '456 Business Park, Sector 5',
            city: 'Pune',
            state: 'Maharashtra',
            zip: '411045',
            isDefault: false,
        },
        {
            id: 3,
            type: 'Parents',
            street: '789 Garden Villa, Near City Park',
            city: 'Delhi',
            state: 'Delhi',
            zip: '110001',
            isDefault: false,
        },
        {
            id: 4,
            type: 'Vacation Home',
            street: '42 Beach Road',
            city: 'Goa',
            state: 'Goa',
            zip: '403001',
            isDefault: false,
        }
    ],

    // Order history
    orders: [
        {
            id: 'ORD-2023-001',
            date: '15 Feb 2025',
            total: 856.50,
            status: 'Delivered',
            items: [
                { name: 'Strawberry', quantity: 2, price: 72.50 },
                { name: 'Avocado', quantity: 1, price: 99.00 },
                { name: 'Organic Apple', quantity: 1, price: 127.50 },
            ],
            reviewed: false,
            expanded: false,
            reviewText: '',
            rating: 0,
        },
        {
            id: 'ORD-2023-002',
            date: '2 Feb 2025',
            total: 415.58,
            status: 'Delivered',
            items: [
                { name: 'Blueberry', quantity: 1, price: 239.20 },
                { name: 'Kiwi', quantity: 1, price: 68.00 },
                { name: 'Cherry Tomatoes', quantity: 1, price: 56.00 },
            ],
            reviewed: true,
            review: {
                text: 'Great products, especially the blueberries. Very fresh!',
                rating: 4
            },
            expanded: false,
        },
        {
            id: 'ORD-2023-003',
            date: '20 Jan 2025',
            total: 626.70,
            status: 'Delivered',
            items: [
                { name: 'Dragon Fruit', quantity: 1, price: 159.60 },
                { name: 'Asparagus', quantity: 1, price: 199.20 },
                { name: 'Organic Banana', quantity: 1, price: 76.50 },
                { name: 'Raspberry', quantity: 1, price: 279.20 },
            ],
            reviewed: true,
            review: {
                text: 'The dragon fruit wasn\'t as ripe as I expected, but everything else was perfect.',
                rating: 3
            },
            expanded: false,
        },
        {
            id: 'ORD-2023-004',
            date: '5 Jan 2025',
            total: 512.30,
            status: 'Delivered',
            items: [
                { name: 'Organic Spinach', quantity: 1, price: 89.00 },
                { name: 'Mushrooms', quantity: 2, price: 112.40 },
                { name: 'Bell Peppers', quantity: 1, price: 78.50 },
            ],
            reviewed: true,
            review: {
                text: 'Fresh vegetables, excellent quality. Would order again!',
                rating: 5
            },
            expanded: false,
        },
        {
            id: 'ORD-2023-005',
            date: '28 Dec 2024',
            total: 345.75,
            status: 'Delivered',
            items: [
                { name: 'Organic Milk', quantity: 2, price: 156.00 },
                { name: 'Free-range Eggs', quantity: 1, price: 189.75 },
            ],
            reviewed: false,
            expanded: false,
            reviewText: '',
            rating: 0,
        }
    ]
};

export default userData;