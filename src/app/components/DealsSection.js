'use client';

import CachedImage from '@/components/CachedImage';

const DealsSection = () => {
  const deals = [
    {
      id: 1,
      title: "Weekend Special",
      description: "Get 20% off on all fresh produce",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&auto=format&fit=crop&q=80&fm=webp&dpr=2",
      discount: "20% OFF",
      validUntil: "This Weekend"
    },
    {
      id: 2,
      title: "Bulk Savings",
      description: "Buy in bulk and save up to 30%",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80&fm=webp&dpr=2",
      discount: "30% OFF",
      validUntil: "Limited Time"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Hot Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {deals.map((deal) => (
            <div key={deal.id} className="relative overflow-hidden rounded-lg shadow-lg">
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {deal.discount}
              </div>
              <div className="aspect-w-16 aspect-h-9">
                <CachedImage 
                  src={deal.image} 
                  alt={deal.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{deal.title}</h3>
                <p className="mt-2 text-gray-600">{deal.description}</p>
                <p className="mt-2 text-sm text-red-600">Valid until: {deal.validUntil}</p>
                <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection; 