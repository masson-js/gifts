'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function createGiftWish(formData) {
  try {
    const giftWish = await prisma.giftWish.create({
      data: {
        name: formData.name,
        class: formData.class,
        age: parseInt(formData.age),
        giftWish: formData.giftWish,
        giftLink: formData.giftLink || null,
      },
    })

    revalidatePath('/')
    
    return { success: true, data: giftWish }
  } catch (error) {
    console.error('Error creating gift wish:', error)
    return { success: false, error: 'Nie udało się wysłać listu do Świętego Mikołaja' }
  }
}

export async function getGiftWishesByClass() {
  try {
    const giftWishes = await prisma.giftWish.findMany({
      orderBy: [
        { class: 'asc' },
        { name: 'asc' }
      ]
    })
    
    // Grupowanie po klasach
    const groupedByClass = giftWishes.reduce((acc, wish) => {
      if (!acc[wish.class]) {
        acc[wish.class] = []
      }
      acc[wish.class].push(wish)
      return acc
    }, {})
    
    return { success: true, data: groupedByClass }
  } catch (error) {
    console.error('Error fetching gift wishes:', error)
    return { success: false, error: 'Nie udało się pobrać życzeń' }
  }
}