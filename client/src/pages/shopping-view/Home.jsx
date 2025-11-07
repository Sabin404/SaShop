import React, { useEffect, useState } from 'react'
import ban1 from '../../assets/ban1.webp'
import ban2 from '../../assets/ban2.jpg'
import ban3 from '../../assets/ban3.jpg'

import { Button } from '@/components/ui/button'
import {
  Airplay,
  BabyIcon,
  ChevronLeft,
  ChevronRight,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProductDetails, fetchAllProducts } from '@/store/shop/product-slice/index'
import ProducTileShoping from '@/components/shopping-view/ProducTileShoping'
import { useNavigate } from 'react-router-dom'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { toast } from 'sonner'
import ProductDetails from '@/components/shopping-view/ProductDetails'

const categoriesWithIcon = [
  { id: 'men', label: 'Men', icon: ShirtIcon },
  { id: 'women', label: 'Women', icon: CloudLightning },
  { id: 'kids', label: 'Kids', icon: BabyIcon },
  { id: 'accessories', label: 'Accessories', icon: WatchIcon },
  { id: 'footwear', label: 'Footwear', icon: UmbrellaIcon },
]

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

const Home = () => {
  const navigate = useNavigate()
  const slides = [ban1, ban2, ban3]
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const { productList ,productDetails} = useSelector((state) => state.shopProducts)
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    dispatch(fetchAllProducts({ filterParams: {}, sortParams: 'atoz' }))
  }, [dispatch])

  const handleNavigateToListingPage = (getCurrItem, section) => {
    sessionStorage.removeItem('Filters');
    const currentFilter = {
      [section]: [getCurrItem.id]
    }
    sessionStorage.setItem('Filters', JSON.stringify(currentFilter))
    navigate('/shop/listing')

  }

  function handleGetProductDetails(getCurrentProductId) {
    // console.log(getCurrentProductId);
    dispatch(fetchAllProductDetails(getCurrentProductId))

  }
  // console.log('Products:', productList)
  function handleAddToCart(getCurrentProductId) {
    console.log(user.userId);

    // console.log(getCurrentProductId);
    dispatch(addToCart({
      userId: user?.userId,
      productId: getCurrentProductId,
      quantity: 1,
    })).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.userId))
        toast.error(data?.payload?.message || "Product added to Cart",
          {
            duration: 3000,
            position: 'top-center',
          }

        );
      }})

  }

  useEffect(() => {
    if (productDetails !== null) setOpen(true)
  }, [productDetails])

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
    <Button className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition">
      <ChevronLeft className="h-5 w-5 text-black" />
    </Button>
    <Button className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition">
      <ChevronRight className="h-5 w-5 text-black" />
    </Button>
  </div>

  {/* Shop by Category Section */}
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {categoriesWithIcon.map((item) => (
          <Card
            onClick={() => handleNavigateToListingPage(item, 'category')}
            key={item.id}
            className="cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 rounded-lg overflow-hidden"
          >
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
              <item.icon className="w-10 h-10 text-blue-600" />
              <p className="text-sm font-medium text-gray-700">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>

  {/* Shop by Brand Section */}
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">
        Shop by Brand
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {brandsWithIcon.map((item) => (
          <Card
            onClick={() => handleNavigateToListingPage(item, 'brand')}
            key={item.id}
            className="cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300 rounded-lg overflow-hidden"
          >
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
              <item.icon className="w-10 h-10 text-blue-600" />
              <p className="text-sm font-medium text-gray-700">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>

  {/* Feature Product Section */}
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <ProducTileShoping
                key={productItem.id}
                handleAddToCart={handleAddToCart}
                handleGetProductDetails={handleGetProductDetails}
                product={productItem}
              />
            ))
          : null}
      </div>
    </div>
    <ProductDetails open={open} setOpen={setOpen} productDetails={productDetails} />
  </section>
</div>

  )
}

export default Home
