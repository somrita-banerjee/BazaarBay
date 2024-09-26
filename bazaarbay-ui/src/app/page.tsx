'use client';
import React, { useEffect, useState } from 'react';
import { getProducts } from '@/src/utils/api'; // Assuming this fetches products
import { ProductDTO } from '@/src/utils/dto'; // Assuming this defines product structure

const HomePage = () => {
    const [products, setProducts] = useState<ProductDTO[]>([]); // State for products
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Fetch products on component mount
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response.data); // Assuming response.data contains the list of products
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array ensures this runs once on mount

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <div>
            {/* Hero Section */}
            <div className="relative bg-gray-800">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover"
                        src="/banner.jpg"
                        alt="Hero banner"
                    />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
                <div className="relative text-center py-20">
                    <h1 className="text-white text-4xl font-bold mb-4">
                        Discover the Best Deals!
                    </h1>
                    <p className="text-gray-200 text-lg mb-6">
                        Explore top categories and shop your favorite products.
                    </p>
                    <button className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition">
                        Shop Now
                    </button>
                </div>
            </div>

            {/* Category Highlights */}
            <div className="py-12">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Shop by Category
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
                    {/* Example categories */}
                    {['Electronics', 'Fashion', 'Home', 'Beauty'].map(
                        (category) => (
                            <div
                                key={category}
                                className="bg-gray-100 p-6 rounded-lg text-center shadow hover:shadow-lg transition"
                            >
                                <img
                                    src={`/category-${category.toLowerCase()}.jpg`}
                                    alt={category}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-xl font-semibold">
                                    {category}
                                </h3>
                            </div>
                        ),
                    )}
                </div>
            </div>

            {/* Featured Products */}
            <div className="py-12 bg-gray-50">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Featured Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
                    {/* Map through products and display each product */}
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="border p-4 rounded-lg shadow hover:shadow-lg transition"
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-indigo-600">
                                ${product.price.toFixed(2)}
                            </p>
                            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Promotional Section */}
            <div className="bg-indigo-600 py-12 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Limited Time Offer!</h2>
                <p className="text-lg mb-6">
                    Get 50% off select items. Hurry up!
                </p>
                <button className="bg-white text-indigo-600 py-3 px-6 rounded-lg hover:bg-gray-100 transition">
                    Shop Deals
                </button>
            </div>

            {/* Newsletter Section */}
            <div className="py-12 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
                <p className="text-gray-600 mb-6">
                    Subscribe for exclusive deals and updates.
                </p>
                <div className="inline-block max-w-lg w-full">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <button className="bg-indigo-600 text-white py-3 px-6 rounded-r-lg hover:bg-indigo-700 transition">
                        Subscribe
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-400 py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>
                        &copy; 2024 Your E-Commerce Brand. All rights reserved.
                    </p>
                    <div className="mt-4">
                        <a href="#" className="mx-2 hover:text-white">
                            Privacy Policy
                        </a>
                        <a href="#" className="mx-2 hover:text-white">
                            Terms of Service
                        </a>
                        <a href="#" className="mx-2 hover:text-white">
                            Contact Us
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;

