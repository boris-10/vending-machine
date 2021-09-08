import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { ProductsContext } from '../../providers/ProductsProvider'
import Product from '../../models/Product'

interface ProductFormProps {
  product?: Product
  onSubmit: () => void
}

function ProductForm(props: ProductFormProps): JSX.Element {
  const { upsertProduct } = useContext(ProductsContext)

  const id = '1'
  const sellerId = '1'
  const name = props.product?.name ?? ''
  const cost = props.product?.cost ?? 0
  const amountAvailable = props.product?.amountAvailable || 0

  const submit = (productModel: Product) => {
    upsertProduct({
      ...productModel,
      sellerId: 'TODO',
    })
    props.onSubmit()
  }

  return (
    <div>
      <Formik
        initialValues={{ id, sellerId, name, cost, amountAvailable }}
        validate={(values: Product) => {
          const errors: { name?: string } = {}
          if (!values.name) {
            errors.name = 'Required'
          }
          return errors
        }}
        onSubmit={(values: Product) => {
          submit(values)
        }}
      >
        <Form>
          <label htmlFor="name">Name</label>
          <Field id="name" name="name" />
          <ErrorMessage name="name" component="span" />

          <br />
          <label htmlFor="cost">Cost</label>
          <Field id="cost" name="cost" type="number" />
          <ErrorMessage name="cost" component="span" />

          <br />
          <label htmlFor="amountAvailable">Amount available</label>
          <Field id="amountAvailable" name="amountAvailable" type="number" />

          <br />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default ProductForm
