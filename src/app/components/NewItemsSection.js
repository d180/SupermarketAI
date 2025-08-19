'use client';

import CartButton from './CartButton';
import CachedImage from '@/components/CachedImage';

const NewItemsSection = () => {
  const newItems = [
    {
      id: 1,
      name: "Organic Avocados",
      price: "$3.99",
      image: "https://images.unsplash.com/photo-1581674210509-d6b7acdea3e6?w=800&auto=format&fit=crop&q=80&fm=webp&dpr=2",
      category: "Produce",
      description: "Fresh organic avocados from California"
    },
    {
      id: 2,
      name: "Almond Milk",
      price: "$4.49",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop&q=80&fm=webp&dpr=2",
      category: "Dairy",
      description: "Creamy almond milk, perfect for smoothies"
    },
    {
      id: 3,
      name: "Quinoa",
      price: "$5.99",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80&fm=webp&dpr=2",
      category: "Grains",
      description: "High-protein ancient grain"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100">
              <div className="relative">
                <CachedImage 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  New
                </div>
              </div>
              <div className="p-6">
                <span className="text-sm text-blue-600 font-semibold">{item.category}</span>
                <h3 className="mt-1 text-xl font-medium text-gray-900">{item.name}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">{item.price}</span>
                  <CartButton product={{
                    _id: item.id,
                    name: item.name,
                    price: parseFloat(item.price.replace('$', '')),
                    image: item.image,
                    category: item.category,
                    unit: 'piece',
                    discount: 0,
                    rating: 4.5,
                    numberOfReviews: 50
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

export default NewItemsSection; 