import React from 'react'
import Product from '../../models/Product'

interface ProductItemProps {
  product: Product
  isSelected: boolean
  onClick: () => void
}

function ProductItem(props: ProductItemProps): JSX.Element {
  return (
    <div
      onClick={props.onClick}
      className={`my-2 border p-2 border-gray-300 rounded-sm cursor-pointer ${
        props.isSelected ? 'bg-indigo-300' : 'hover:bg-gray-200'
      }`}
    >
      <div className="flex justify-between">
        <span>
          <b>{props.product.productName}</b>&nbsp;
          <span className="text-sm">(x{props.product.amountAvailable})</span>
        </span>
        <span>
          <b>{props.product.cost}</b> ¢
        </span>
      </div>
    </div>
  )
}

export default ProductItem
