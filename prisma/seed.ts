import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clean existing data (in development only!)
  if (process.env.NODE_ENV === 'development') {
    console.log('🧹 Cleaning existing data...')
    await prisma.inventoryMovement.deleteMany()
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.cartItem.deleteMany()
    await prisma.cart.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()
  }

  // Seed Categories
  console.log('📦 Seeding categories...')
  const electronicsCategory = await prisma.category.create({
    data: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Electronic devices and accessories',
      isActive: true,
    },
  })

  const audioCategory = await prisma.category.create({
    data: {
      name: 'Audio',
      slug: 'audio',
      description: 'Headphones, speakers, and audio accessories',
      parentId: electronicsCategory.id,
      isActive: true,
    },
  })

  const wearablesCategory = await prisma.category.create({
    data: {
      name: 'Wearables',
      slug: 'wearables',
      description: 'Smartwatches and fitness trackers',
      parentId: electronicsCategory.id,
      isActive: true,
    },
  })

  const homeCategory = await prisma.category.create({
    data: {
      name: 'Home & Living',
      slug: 'home-living',
      description: 'Home decor and living essentials',
      isActive: true,
    },
  })

  // Seed Products
  console.log('🛍️  Seeding products...')

  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Wireless Headphones Pro',
        description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.',
        sku: 'WHP-001',
        price: 129.99,
        compareAtPrice: 199.99,
        stock: 45,
        lowStockThreshold: 10,
        category: 'Audio',
        categoryId: audioCategory.id,
        brand: 'TechCorp',
        tags: ['wireless', 'noise-cancellation', 'premium', 'bluetooth'],
        images: [
          {
            url: '/products/headphones-1.jpg',
            alt: 'Wireless Headphones Pro - Front View',
            isPrimary: true,
          },
          {
            url: '/products/headphones-2.jpg',
            alt: 'Wireless Headphones Pro - Side View',
            isPrimary: false,
          },
        ],
        specifications: {
          'Battery Life': '30 hours',
          'Bluetooth Version': '5.2',
          'Weight': '250g',
          'Color': 'Matte Black',
          'Driver Size': '40mm',
        },
        isActive: true,
        isFeatured: true,
      },
    }),

    prisma.product.create({
      data: {
        name: 'Smart Watch Ultra',
        description: 'Advanced smartwatch with comprehensive health tracking, GPS, water resistance up to 50m, and week-long battery life.',
        sku: 'SWU-002',
        price: 399.99,
        stock: 28,
        lowStockThreshold: 15,
        category: 'Wearables',
        categoryId: wearablesCategory.id,
        brand: 'TechCorp',
        tags: ['smartwatch', 'health', 'fitness', 'gps'],
        images: [
          {
            url: '/products/watch-1.jpg',
            alt: 'Smart Watch Ultra',
            isPrimary: true,
          },
        ],
        specifications: {
          'Display': '1.9" AMOLED',
          'Battery Life': '7 days',
          'Water Resistance': '50m',
          'Sensors': 'Heart Rate, SpO2, GPS, Gyroscope',
        },
        isActive: true,
        isFeatured: true,
      },
    }),

    prisma.product.create({
      data: {
        name: 'Bluetooth Speaker Max',
        description: '360-degree sound portable speaker with 20-hour playtime, waterproof design, and deep bass.',
        sku: 'BSM-003',
        price: 89.99,
        compareAtPrice: 129.99,
        stock: 67,
        lowStockThreshold: 20,
        category: 'Audio',
        categoryId: audioCategory.id,
        brand: 'SoundWave',
        tags: ['speaker', 'bluetooth', 'waterproof', 'portable'],
        images: [
          {
            url: '/products/speaker-1.jpg',
            alt: 'Bluetooth Speaker Max',
            isPrimary: true,
          },
        ],
        specifications: {
          'Power Output': '40W',
          'Battery Life': '20 hours',
          'Waterproof Rating': 'IPX7',
          'Connectivity': 'Bluetooth 5.0, AUX',
        },
        isActive: true,
        isFeatured: false,
      },
    }),

    prisma.product.create({
      data: {
        name: 'Gaming Headset RGB',
        description: 'Professional gaming headset with 7.1 surround sound, RGB lighting, and noise-cancelling microphone.',
        sku: 'GHR-004',
        price: 79.99,
        stock: 34,
        lowStockThreshold: 15,
        category: 'Audio',
        categoryId: audioCategory.id,
        brand: 'GameGear',
        tags: ['gaming', 'headset', 'rgb', 'surround-sound'],
        images: [
          {
            url: '/products/gaming-headset-1.jpg',
            alt: 'Gaming Headset RGB',
            isPrimary: true,
          },
        ],
        specifications: {
          'Driver Size': '50mm',
          'Frequency Response': '20Hz-20kHz',
          'Microphone': 'Detachable noise-cancelling',
          'Connection': 'USB, 3.5mm',
        },
        isActive: true,
        isFeatured: true,
      },
    }),

    prisma.product.create({
      data: {
        name: 'Fitness Tracker Lite',
        description: 'Affordable fitness tracker with heart rate monitoring, sleep tracking, and 14-day battery life.',
        sku: 'FTL-005',
        price: 49.99,
        stock: 89,
        lowStockThreshold: 30,
        category: 'Wearables',
        categoryId: wearablesCategory.id,
        brand: 'FitLife',
        tags: ['fitness', 'tracker', 'health', 'affordable'],
        images: [
          {
            url: '/products/fitness-tracker-1.jpg',
            alt: 'Fitness Tracker Lite',
            isPrimary: true,
          },
        ],
        specifications: {
          'Display': '0.96" OLED',
          'Battery Life': '14 days',
          'Water Resistance': '5ATM',
          'Sensors': 'Heart Rate, Pedometer',
        },
        isActive: true,
        isFeatured: false,
      },
    }),

    prisma.product.create({
      data: {
        name: 'Wireless Earbuds Pro',
        description: 'True wireless earbuds with active noise cancellation, touch controls, and premium sound quality.',
        sku: 'WEP-006',
        price: 159.99,
        compareAtPrice: 219.99,
        stock: 8,
        lowStockThreshold: 10,
        category: 'Audio',
        categoryId: audioCategory.id,
        brand: 'TechCorp',
        tags: ['earbuds', 'wireless', 'noise-cancellation', 'touch-control'],
        images: [
          {
            url: '/products/earbuds-1.jpg',
            alt: 'Wireless Earbuds Pro',
            isPrimary: true,
          },
        ],
        specifications: {
          'Battery Life': '6h (24h with case)',
          'Charging': 'USB-C, Wireless',
          'Driver Size': '11mm',
          'Water Resistance': 'IPX4',
        },
        isActive: true,
        isFeatured: true,
      },
    }),

    prisma.product.create({
      data: {
        name: 'Smart Home Hub',
        description: 'Control all your smart home devices from one place. Voice control compatible with Alexa and Google Assistant.',
        sku: 'SHH-007',
        price: 129.99,
        stock: 23,
        lowStockThreshold: 10,
        category: 'Home & Living',
        categoryId: homeCategory.id,
        brand: 'SmartHome Inc',
        tags: ['smart-home', 'automation', 'voice-control', 'hub'],
        images: [
          {
            url: '/products/smart-hub-1.jpg',
            alt: 'Smart Home Hub',
            isPrimary: true,
          },
        ],
        specifications: {
          'Connectivity': 'Wi-Fi, Bluetooth, Zigbee',
          'Voice Assistant': 'Alexa, Google Assistant',
          'Supported Devices': '100+',
        },
        isActive: true,
        isFeatured: false,
      },
    }),

    prisma.product.create({
      data: {
        name: 'Portable Power Bank 20000mAh',
        description: 'High-capacity power bank with fast charging support for all your devices on the go.',
        sku: 'PPB-008',
        price: 39.99,
        stock: 156,
        lowStockThreshold: 50,
        category: 'Electronics',
        categoryId: electronicsCategory.id,
        brand: 'PowerPlus',
        tags: ['power-bank', 'charging', 'portable', 'fast-charge'],
        images: [
          {
            url: '/products/power-bank-1.jpg',
            alt: 'Portable Power Bank',
            isPrimary: true,
          },
        ],
        specifications: {
          'Capacity': '20000mAh',
          'Input': 'USB-C 18W',
          'Output': '2x USB-A 12W, 1x USB-C 18W',
          'Charging Time': '6 hours',
        },
        isActive: true,
        isFeatured: false,
      },
    }),
  ])

  console.log(`✅ Created ${products.length} products`)

  console.log('✨ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
