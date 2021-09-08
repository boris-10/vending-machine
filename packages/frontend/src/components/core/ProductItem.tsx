import React from 'react'
import Product from '../../models/Product'

interface ProductItemProps {
  product: Product
  isSelected: boolean
  onClick: () => void
}

function ProductItem(props: ProductItemProps): JSX.Element {
  return (
    <div onClick={props.onClick} className={`ProductItem ${props.isSelected && 'ProductItem--selected'}`}>
      <b>{props.product.name}</b> ({props.product.amountAvailable}): <b>{props.product.cost}</b> ¢
    </div>
  )
}

export default ProductItem
