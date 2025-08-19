import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Product from '@/model/Product';

const sampleProducts = {
  fruits: [
    {
      name: "Fresh Apples",
      description: "Crisp and juicy red apples, perfect for snacking",
      price: 2.99,
      subCategory: "apples",
      image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&auto=format&fit=crop&q=80&fm=webp&dpr=2",
      stock: 100,
      unit: "kg",
      rating: 4.5,
      numberOfReviews: 120,
      discount: 0
    },
    {
      name: "Organic Bananas",
      description: "Sweet and nutritious organic bananas",
      price: 1.99,
      subCategory: "bananas",
      image: "https://images.unsplash.com/photo-1543218024-57a70143c369?w=800&auto=format&fit=crop&q=80&fm=webp&dpr=2",
      stock: 150,
      unit: "kg",
      rating: 4.7,
      numberOfReviews: 95,
      discount: 10
    },
    {
      name: "Sweet Oranges",
      description: "Juicy and sweet oranges, rich in Vitamin C",
      price: 3.49,
      subCategory: "citrus",
      image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=800&auto=format&fit=crop&q=80&fm=webp&dpr=2",
      stock: 120,
      unit: "kg",
      rating: 4.6,
      numberOfReviews: 88,
      discount: 0
    },
    {
      name: "Fresh Strawberries",
      description: "Sweet and succulent strawberries",
      price: 4.99,
      subCategory: "berries",
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop&q=80&fm=webp&dpr=2",
      stock: 80,
      unit: "pack",
      rating: 4.8,
      numberOfReviews: 150,
      discount: 0
    },
    {
      name: "Ripe Mangoes",
      description: "Sweet and aromatic mangoes",
      price: 5.99,
      subCategory: "tropical",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80&fm=webp&dpr=2",
      stock: 70,
      unit: "kg",
      rating: 4.9,
      numberOfReviews: 110,
      discount: 15
    }
  ],
  vegetables: [
    {
      name: "Fresh Carrots",
      description: "Sweet and crunchy carrots, rich in vitamins",
      price: 1.49,
      subCategory: "root vegetables",
      image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=800",
      stock: 80,
      unit: "kg",
      rating: 4.3,
      numberOfReviews: 75,
      discount: 0
    },
    {
      name: "Organic Spinach",
      description: "Fresh organic spinach leaves",
      price: 2.99,
      subCategory: "leafy greens",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800",
      stock: 60,
      unit: "pack",
      rating: 4.6,
      numberOfReviews: 45,
      discount: 0
    },
    {
      name: "Fresh Tomatoes",
      description: "Ripe and juicy tomatoes",
      price: 2.49,
      subCategory: "vegetables",
      image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=800",
      stock: 90,
      unit: "kg",
      rating: 4.4,
      numberOfReviews: 82,
      discount: 0
    },
    {
      name: "Broccoli",
      description: "Fresh and crisp broccoli florets",
      price: 3.29,
      subCategory: "cruciferous",
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=800",
      stock: 70,
      unit: "kg",
      rating: 4.5,
      numberOfReviews: 63,
      discount: 10
    },
    {
      name: "Bell Peppers Mix",
      description: "Colorful mix of fresh bell peppers",
      price: 4.99,
      subCategory: "peppers",
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800",
      stock: 65,
      unit: "pack",
      rating: 4.7,
      numberOfReviews: 92,
      discount: 0
    }
  ],
  dairy: [
    {
      name: "Whole Milk",
      description: "Fresh whole milk, rich in calcium",
      price: 3.49,
      subCategory: "milk",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800",
      stock: 50,
      unit: "l",
      rating: 4.4,
      numberOfReviews: 85,
      discount: 0
    },
    {
      name: "Greek Yogurt",
      description: "Creamy Greek yogurt, high in protein",
      price: 4.99,
      subCategory: "yogurt",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800",
      stock: 40,
      unit: "pack",
      rating: 4.8,
      numberOfReviews: 65,
      discount: 15
    },
    {
      name: "Cheddar Cheese",
      description: "Aged cheddar cheese",
      price: 6.99,
      subCategory: "cheese",
      image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=800",
      stock: 45,
      unit: "pack",
      rating: 4.6,
      numberOfReviews: 78,
      discount: 0
    },
    {
      name: "Butter",
      description: "Pure unsalted butter",
      price: 4.49,
      subCategory: "butter",
      image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800",
      stock: 55,
      unit: "pack",
      rating: 4.7,
      numberOfReviews: 92,
      discount: 0
    },
    {
      name: "Heavy Cream",
      description: "Fresh heavy whipping cream",
      price: 3.99,
      subCategory: "cream",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800",
      stock: 35,
      unit: "l",
      rating: 4.5,
      numberOfReviews: 45,
      discount: 0
    }
  ],
  meat: [
    {
      name: "Chicken Breast",
      description: "Fresh boneless chicken breast",
      price: 8.99,
      subCategory: "poultry",
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800",
      stock: 30,
      unit: "kg",
      rating: 4.5,
      numberOfReviews: 55,
      discount: 0
    },
    {
      name: "Ground Beef",
      description: "Premium ground beef, 80% lean",
      price: 7.99,
      subCategory: "beef",
      image: "https://images.unsplash.com/photo-1588347785102-2944b1483755?w=800",
      stock: 25,
      unit: "kg",
      rating: 4.3,
      numberOfReviews: 40,
      discount: 0
    },
    {
      name: "Salmon Fillet",
      description: "Fresh Atlantic salmon fillet",
      price: 12.99,
      subCategory: "seafood",
      image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=800",
      stock: 20,
      unit: "kg",
      rating: 4.8,
      numberOfReviews: 75,
      discount: 10
    },
    {
      name: "Pork Chops",
      description: "Premium cut pork chops",
      price: 9.99,
      subCategory: "pork",
      image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=800",
      stock: 28,
      unit: "kg",
      rating: 4.4,
      numberOfReviews: 48,
      discount: 0
    },
    {
      name: "Turkey Breast",
      description: "Lean turkey breast",
      price: 10.99,
      subCategory: "poultry",
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800",
      stock: 22,
      unit: "kg",
      rating: 4.6,
      numberOfReviews: 35,
      discount: 0
    }
  ],
  pantry: [
    {
      name: "Organic Rice",
      description: "Premium quality organic rice",
      price: 5.99,
      subCategory: "grains",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800",
      stock: 100,
      unit: "kg",
      rating: 4.6,
      numberOfReviews: 90,
      discount: 0
    },
    {
      name: "Extra Virgin Olive Oil",
      description: "High-quality extra virgin olive oil",
      price: 12.99,
      subCategory: "oils",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800",
      stock: 40,
      unit: "l",
      rating: 4.7,
      numberOfReviews: 75,
      discount: 0
    },
    {
      name: "Pasta Variety Pack",
      description: "Assorted Italian pasta shapes",
      price: 6.99,
      subCategory: "pasta",
      image: "https://images.unsplash.com/photo-1551462147-37885acc36f1?w=800",
      stock: 60,
      unit: "pack",
      rating: 4.5,
      numberOfReviews: 82,
      discount: 15
    },
    {
      name: "Canned Tomatoes",
      description: "Premium Italian canned tomatoes",
      price: 3.49,
      subCategory: "canned goods",
      image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=800",
      stock: 85,
      unit: "piece",
      rating: 4.4,
      numberOfReviews: 65,
      discount: 0
    },
    {
      name: "Quinoa",
      description: "Organic white quinoa",
      price: 7.99,
      subCategory: "grains",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800",
      stock: 70,
      unit: "kg",
      rating: 4.8,
      numberOfReviews: 95,
      discount: 0
    }
  ],
  beverages: [
    {
      name: "Orange Juice",
      description: "Freshly squeezed orange juice",
      price: 4.99,
      subCategory: "juices",
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800",
      stock: 35,
      unit: "l",
      rating: 4.5,
      numberOfReviews: 60,
      discount: 0
    },
    {
      name: "Green Tea",
      description: "Premium quality green tea leaves",
      price: 6.99,
      subCategory: "tea",
      image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800",
      stock: 50,
      unit: "pack",
      rating: 4.8,
      numberOfReviews: 85,
      discount: 10
    },
    {
      name: "Sparkling Water",
      description: "Natural sparkling mineral water",
      price: 2.99,
      subCategory: "water",
      image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=800",
      stock: 75,
      unit: "l",
      rating: 4.3,
      numberOfReviews: 55,
      discount: 0
    },
    {
      name: "Coffee Beans",
      description: "Premium Arabica coffee beans",
      price: 14.99,
      subCategory: "coffee",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800",
      stock: 45,
      unit: "kg",
      rating: 4.9,
      numberOfReviews: 120,
      discount: 0
    },
    {
      name: "Coconut Water",
      description: "Natural coconut water",
      price: 3.99,
      subCategory: "natural drinks",
      image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=800",
      stock: 55,
      unit: "l",
      rating: 4.6,
      numberOfReviews: 72,
      discount: 0
    }
  ],
  snacks: [
    {
      name: "Mixed Nuts",
      description: "Premium mixed nuts selection",
      price: 8.99,
      subCategory: "nuts",
      image: "https://images.unsplash.com/photo-1536591375667-f93058e2b5f6?w=800",
      stock: 45,
      unit: "pack",
      rating: 4.7,
      numberOfReviews: 70,
      discount: 0
    },
    {
      name: "Dark Chocolate",
      description: "70% cocoa dark chocolate",
      price: 4.99,
      subCategory: "chocolate",
      image: "https://images.unsplash.com/photo-1548907040-4d42bdfb6042?w=800",
      stock: 60,
      unit: "piece",
      rating: 4.9,
      numberOfReviews: 95,
      discount: 0
    },
    {
      name: "Potato Chips",
      description: "Classic salted potato chips",
      price: 3.49,
      subCategory: "chips",
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800",
      stock: 80,
      unit: "pack",
      rating: 4.4,
      numberOfReviews: 88,
      discount: 10
    },
    {
      name: "Trail Mix",
      description: "Healthy trail mix with dried fruits",
      price: 6.99,
      subCategory: "mixed",
      image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=800",
      stock: 55,
      unit: "pack",
      rating: 4.6,
      numberOfReviews: 65,
      discount: 0
    },
    {
      name: "Protein Bars",
      description: "Nutritious protein bars",
      price: 2.99,
      subCategory: "health",
      image: "https://images.unsplash.com/photo-1622484212850-eb596d769edc?w=800",
      stock: 70,
      unit: "piece",
      rating: 4.5,
      numberOfReviews: 82,
      discount: 0
    }
  ],
  household: [
    {
      name: "Dish Soap",
      description: "Eco-friendly dish soap",
      price: 3.99,
      subCategory: "cleaning",
      image: "https://images.unsplash.com/photo-1622483767028-3f66869433c7?w=800",
      stock: 40,
      unit: "piece",
      rating: 4.4,
      numberOfReviews: 50,
      discount: 0
    },
    {
      name: "Paper Towels",
      description: "Premium quality paper towels",
      price: 5.99,
      subCategory: "paper goods",
      image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800",
      stock: 30,
      unit: "pack",
      rating: 4.6,
      numberOfReviews: 65,
      discount: 0
    },
    {
      name: "Laundry Detergent",
      description: "Concentrated laundry detergent",
      price: 12.99,
      subCategory: "laundry",
      image: "https://images.unsplash.com/photo-1626806787461-102c1a62d344?w=800",
      stock: 35,
      unit: "l",
      rating: 4.7,
      numberOfReviews: 78,
      discount: 15
    },
    {
      name: "All-Purpose Cleaner",
      description: "Natural all-purpose cleaner",
      price: 4.99,
      subCategory: "cleaning",
      image: "https://images.unsplash.com/photo-1622483767028-3f66869433c7?w=800",
      stock: 45,
      unit: "piece",
      rating: 4.5,
      numberOfReviews: 55,
      discount: 0
    },
    {
      name: "Trash Bags",
      description: "Heavy-duty trash bags",
      price: 8.99,
      subCategory: "essentials",
      image: "https://images.unsplash.com/photo-1610505466122-b1fe0875d748?w=800",
      stock: 50,
      unit: "pack",
      rating: 4.3,
      numberOfReviews: 42,
      discount: 0
    }
  ]
};

export async function POST() {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');

    // Clear existing products
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    console.log('Existing products cleared');

    let totalProducts = 0;
    // Insert new products
    for (const [category, products] of Object.entries(sampleProducts)) {
      console.log(`Adding products for category: ${category}`);
      for (const product of products) {
        await Product.create({
          ...product,
          category,
          isAvailable: true,
          tags: [category, product.subCategory]
        });
        totalProducts++;
      }
      console.log(`Added ${products.length} products to ${category}`);
    }

    console.log(`Total products added: ${totalProducts}`);

    return NextResponse.json(
      { message: `Products populated successfully. Total products: ${totalProducts}` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error populating products:', error);
    return NextResponse.json(
      { message: 'Error populating products', error: error.message },
      { status: 500 }
    );
  }
} 