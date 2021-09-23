import Link from 'next/link'

import Product from '../../models/Product'

interface ProductItemProps {
  product: Product
  isSelected?: boolean
  onClick: () => void
}

const ProductItem = ({ product, isSelected, onClick }: ProductItemProps): JSX.Element => {
  return (
    <Link href={`/products/${product.id}`}>
      <div
        onClick={onClick}
        className={`my-2 border p-2 border-gray-300 rounded-sm cursor-pointer ${
          isSelected ? 'bg-indigo-300' : 'hover:bg-gray-200'
        }`}
      >
        <div className="flex justify-between">
          <span>
            <b>{product.name}</b>&nbsp;
            <span className="text-sm">(x{product.amountAvailable})</span>
          </span>
          <span>
            <b>{product.cost}</b> ¢
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
