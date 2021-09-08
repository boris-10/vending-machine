import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import { useMutation, useQuery } from 'react-query'

import Product from '../../models/Product'

interface ProductFormProps {
  productId?: number
  onSubmit: () => void
}

function ProductForm(props: ProductFormProps): JSX.Element {
  const upsertProductMutation = useMutation((productModel: Product) => {
    const { id, ...payload } = productModel

    if (productModel.id) {
      return axios.patch(`/products/${productModel.id}`, payload)
    } else {
      return axios.post('/products', payload)
    }
  })

  const { isLoading, isError, data, error, remove } = useQuery(
    'fetchProductById',
    () => axios(`/products/${props.productId}`),
    { enabled: !!props.productId }
  )

  if (!props.productId) {
    remove()
  }

  if (isLoading) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error</span>
  }

  const id = data?.data.id ?? null
  const sellerId = data?.data.sellerId ?? 1
  const productName = data?.data.productName ?? ''
  const cost = data?.data.cost ?? 0
  const amountAvailable = data?.data.amountAvailable ?? 0

  return (
    <div>
      <h2>{props.productId ? `Edit product - ${productName}` : 'Create product'}</h2>

      <Formik
        enableReinitialize
        initialValues={{ id, sellerId, productName, cost, amountAvailable }}
        validate={(model: Product) => {
          const errors: { name?: string } = {}
          if (!model.productName) {
            errors.name = 'Required'
          }
          return errors
        }}
        onSubmit={(model: Product) => {
          upsertProductMutation.mutate(model)
          props.onSubmit()
        }}
      >
        <Form>
          <label htmlFor="productName">Name</label>
          <Field id="productName" name="productName" />
          <ErrorMessage name="productName" component="span" />

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
