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
  const createProductMutation = useMutation((productModel: Product) =>
    axios.post('http://localhost:8080/products', productModel)
  )

  const { isLoading, isError, data, error, remove } = useQuery(
    'fetchProductById',
    () =>
      axios(`http://localhost:8080/products/${props.productId}`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNjMxMTAzMzQ4fQ.yqitnSBq20KnHZybDi8dRHCbIEQ0P8bH4bed37Fu7fQ',
        },
      }),
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

  const id = data?.data.id ?? 0
  const sellerId = data?.data.sellerId ?? ''
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
          createProductMutation.mutate(model)
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
