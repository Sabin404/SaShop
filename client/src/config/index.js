
export const registerFormControl = [
  {
    name: 'username',
    type: 'text',
    placeholder: 'Enter your Username',
    required: true,
    componentType: 'input',
    label: 'Username'
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Enter your Email',
    required: true,
    componentType: 'input',
    label: 'Email'
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Enter your Password',
    required: true,
    componentType: 'input',
    label: 'Password'
  }
]

export const loginFormControl = [

  {
    name: 'email',
    type: 'email',
    placeholder: 'Enter your Email',
    required: true,
    componentType: 'input',
    label: 'Email'
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Enter your Password',
    required: true,
    componentType: 'input',
    label: 'Password'
  }
]

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderItems = [
  {
    id: 'home',
    label: 'Home',
    path: '/shop/home'
  },
  {
    id: 'men',
    label: 'Men',
    path: '/shop/listing'
  },
  {
    id: 'women',
    label: 'Women',
    path: '/shop/listing'
  },
  {
    id: 'kids',
    label: 'Kids',
    path: '/shop/listing'
  },
  {
    id: 'footware',
    label: 'Footware',
    path: '/shop/listing'
  },
  {
    id: 'accessories',
    label: 'Accessories',
    path: '/shop/listing'
  }
]

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footware", label: "Footware" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ]

}

export const sortOptions=[
  {id:"price-lowtohigh",label:'Price Low to High'},
  {id:"price-hightolow",label:'Price High to Low'},
  {id:"atoz",label:'Title: A-Z'},
  {id:"ztoa",label:'Title: Z-A'},
]