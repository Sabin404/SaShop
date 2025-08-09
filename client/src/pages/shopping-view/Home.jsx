import React, { useEffect } from 'react'
import ban1 from '../../assets/ban1.webp'
import ban2 from '../../assets/ban2.jpg'
import ban3 from '../../assets/ban3.jpg'

import { Button } from '@/components/ui/button'
import {
  BabyIcon,
  ChevronLeft,
  ChevronRight,
  CloudLightning,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '@/store/shop/product-slice/index'

const categoriesWithIcon = [
  { id: 'men', label: 'Men', icon: ShirtIcon },
  { id: 'women', label: 'Women', icon: CloudLightning },
  { id: 'kids', label: 'Kids', icon: BabyIcon },
  { id: 'accessories', label: 'Accessories', icon: WatchIcon },
  { id: 'footwear', label: 'Footwear', icon: UmbrellaIcon },
]


const Home = () => {
  const slides = [ban1, ban2, ban3]
  const dispatch = useDispatch()
  const { productList } = useSelector((state) => state.shopProducts)
  useEffect(() => {
    dispatch(fetchAllProducts({ filterParams: {}, sortParams: 'atoz' }))
  }, [dispatch])


  console.log('Products:', productList)


  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Slider Section */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Slide ${index + 1}`}
            className="absolute w-full h-full object-cover top-0 left-0 transition-opacity duration-1000 opacity-0 first:opacity-100"
          />
        ))}

        {/* Carousel Arrows */}
        <Button className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-100">
          <ChevronLeft className="h-5 w-5 text-black" />
        </Button>
        <Button className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-100">
          <ChevronRight className="h-5 w-5 text-black" />
        </Button>
      </div>

      {/* Shop by Category Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {categoriesWithIcon.map((item, index) => (
              <Card
                key={item.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                  <item.icon className="w-8 h-8 text-blue-600" />
                  <p className="text-sm font-medium text-gray-700">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
