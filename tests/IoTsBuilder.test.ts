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
      .description('foo')
      .build()

    expect(() => Order.decode(built)).not.toThrow()
    expect(built).toEqual({ id: 4, description: 'foo' })
  })

  it('should throw error when trying to build an invalid object', () => {
    const builder = IoTsBuilder(Order).id(4)

    expect(builder.build).toThrow('description')
  })

  describe('with template object', () => {
    it('should create a copy of the template object', () => {
      const template: IOrder = { description: 'foo', id: 42 }

      const built: IOrder = IoTsBuilder(Order, template).build()

      expect(built).toEqual(template)
    })
    it('should build a modified template object', () => {
      const template: IOrder = { description: 'foo', id: 42 }

      const built: IOrder = IoTsBuilder(Order, template)
        .id(19)
        .build()

      expect(built).toEqual({ description: 'foo', id: 19 })
    })
    it('should not modify the template object', () => {
      const template: IOrder = { description: 'foo', id: 42 }

      const built: IOrder = IoTsBuilder(Order, template)
        .id(19)
        .build()

      expect(template.id).toEqual(42)
    })
    it('should reject an invalid template object', () => {
      const template: IOrder = { description: 'foo' } as IOrder

      expect(() => IoTsBuilder(Order, template)).toThrow('id')
    })
  })
})
