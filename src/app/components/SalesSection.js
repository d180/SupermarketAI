'use client';

import CartButton from './CartButton';
import CachedImage from '@/components/CachedImage';

const SalesSection = () => {
  const saleItems = [
    {
      id: 1,
      name: "Organic Bananas",
      originalPrice: "$2.99",
      salePrice: "$1.99",
      image: "https://images.unsplash.com/photo-1543218024-57a70143c369?w=800&auto=format&fit=crop&q=80&fm=webp&dpr=2",
      category: "fruits"
    },
    {
      id: 2,
      name: "Whole Grain Bread",
      originalPrice: "$4.99",
      salePrice: "$3.49",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80&fm=webp&dpr=2",
      category: "Bakery"
    },
    {
      id: 3,
      name: "Greek Yogurt",
      originalPrice: "$5.99",
      salePrice: "$4.49",
      image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800&auto=format&fit=crop&q=80&fm=webp&dpr=2",
      category: "dairy"
    },
    {
      id: 4,
      name: "Fresh Spinach",
      originalPrice: "$3.99",
      salePrice: "$2.99",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop&q=80&fm=webp&dpr=2",
      category: "vegetables"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Items on Sale</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-1 aspect-h-1">
                <CachedImage 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <span className="text-sm text-green-600 font-semibold">{item.category}</span>
                <h3 className="mt-1 text-lg font-medium text-gray-900">{item.name}</h3>
                <div className="mt-2 flex items-center">
                  <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                  <span className="ml-2 text-lg font-bold text-green-600">{item.salePrice}</span>
                </div>
                <div className="mt-4">
                  <CartButton product={{
                    _id: item.id,
                    name: item.name,
                    price: parseFloat(item.salePrice.replace('$', '')),
                    image: item.image,
                    category: item.category,
                    unit: 'piece',
                    discount: 0,
                    rating: 4.5,
                    numberOfReviews: 100
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalesSection; 