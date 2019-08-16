# eslint-plugin-react-native-normalized

Prevents the import of native components of React Native when there is a version of [`react-native-normalized`](https://github.com/kida007/react-native-normalized) available.

### Options

This rule supports the follwing options:

* `disallowed`: Which imports are not allowed from `react-native`. Defaults to `['Text', 'Alert', 'Image']`. Possible values: Array of `Text`, `Alert`, `Image`, `ActivityIndicator`, `TextInput`


## `react-native-normalized/forbid-native-components`

### Fail

```js
import {Text} from 'react-native'
const {Text, Image} = require('react-native')
```


### Pass

```js
import {Text} from 'react-native-normalized' // Import from normalized
import {View} from 'react-native' // No react-native-normalized version available.
```

## Author
- [Jonny Burger](https://jonny.io)
