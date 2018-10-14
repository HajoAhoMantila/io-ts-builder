[![CircleCI](https://circleci.com/gh/HajoAhoMantila/io-ts-builder.svg?style=svg)](https://circleci.com/gh/HajoAhoMantila/io-ts-builder)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# io-ts-builder

Builder implementation for use with io-ts (https://github.com/gcanti/io-ts). Lets you create valid objects (optionally starting from a template object) using a fluent API.

For the same without io-ts, see https://www.npmjs.com/package/builder-pattern.

## Usage

### Basic usage

```
import * as t from 'io-ts'
import { IoTsBuilder } from 'io-ts-builder'

const Order = t.type({
  description: t.string,
  id: t.number
})

type IOrder = t.TypeOf<typeof Order>

const order: IOrder = IoTsBuilder(Order)
  .id(4)
  .description('foo')
  .build()
```
Actually, the type can be inferred:
```
const order = IoTsBuilder(Order)
  .id(4)
  .description('foo')
  .build()
```

When trying to build an invalid object, e.g.

```
const order = IoTsBuilder(Order)
  .id(4)
  .build()
```
the call to `build()` will throw an error using the ThrowReporter from io-ts.


### Usage with template objects

You can also specify a template object, which allows easy creation of variation of objects. 
This is especially useful for making test data setup more readable:

```
const defaultOrder: IOrder = {
  id: 1,
  description: 'Default order'
};

const modifiedOrder = IoTsBuilder(defaultOrder)
  .id(2)
  .build();
```

## Contributing

PRs are welcome!

## Credits

Based on builder-pattern (https://www.npmjs.com/package/builder-pattern) by Vincent Pang.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.