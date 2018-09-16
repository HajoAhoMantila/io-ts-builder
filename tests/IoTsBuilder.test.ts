import * as t from 'io-ts'
import { IoTsBuilder } from '../src'

const Order = t.type({
  description: t.string,
  id: t.number
})

type IOrder = t.TypeOf<typeof Order>

describe('io-ts-builder', () => {
  it('should build a valid object', () => {
    const built: IOrder = IoTsBuilder(Order)
      .id(4)
      .description('description')
      .build()

    expect(() => Order.decode(built)).not.toThrow()
    expect(built).toEqual({ id: 4, description: 'description' })
  })

  it('should throw error when trying to build an invalid object', () => {
    const builder = IoTsBuilder(Order).id(4)

    expect(builder.build).toThrow('description')
  })
})
