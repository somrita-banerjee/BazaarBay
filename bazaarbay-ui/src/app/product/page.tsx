'use client';
import { getProducts } from '@/src/utils/api';
import { ProductDTO } from '@/src/utils/dto';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [data, setData] = useState<ProductDTO[]>([]); // State to hold API data
    const [loading, setLoading] = useState(true); // State for loading
    const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(
        null,
    ); // State for the selected product

    useEffect(() => {
        // API call when the component loads
        const fetchData = async () => {
            try {
                const response = await getProducts();
                setData(response.data); // Store the data in state
                setSelectedProduct(response.data[0]); // Set first product as default selected
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures it runs only once on mount

    // Render loading state
    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image Section */}
                {selectedProduct && (
                    <>
                        <div className="product-images">
                            <img
                                src={selectedProduct.imageUrl}
                                alt={selectedProduct.name}
                                className="w-full object-cover rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Product Details Section */}
                        <div className="product-details space-y-6">
                            <h1 className="text-3xl font-bold">
                                {selectedProduct.name}
                            </h1>
                            <p className="text-lg text-gray-600">
                                {selectedProduct.description}
                            </p>
                            <p className="text-2xl font-semibold text-indigo-600">
                                ${selectedProduct.price.toFixed(2)}
                            </p>
                            <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-all">
                                Add to Cart
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Product List Section */}
            <div className="suggested-products mt-12">
                <h2 className="text-2xl font-bold mb-4">Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Render the products as cards */}
                    {data.map((product) => (
                        <div
                            key={product._id}
                            className="border p-4 rounded-lg shadow hover:shadow-lg transition-all cursor-pointer"
                            onClick={() => setSelectedProduct(product)}
                        >
                            {/* <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              /> */}
                            <p className="font-semibold mt-2">{product.name}</p>
                            <p className="text-indigo-600">
                                ${product.price.toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
