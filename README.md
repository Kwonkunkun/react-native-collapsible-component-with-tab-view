<h1 align="center">Welcome to react-native-collapsible-component-with-tab-view 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/react-native-collapsible-component-with-tab-view" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/react-native-collapsible-component-with-tab-view.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

### 🏠 [Homepage](https://github.com/Kwonkunkun/react-native-collapsible-component-with-tab-view)

<Image style="width:200px" src="./image/example-image.gif">

## Dependency

```sh
yarn add react-native-reanimated

and setting refer under uri
(https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation)

and

yarn add react-native-redash
```

## Install

```sh
npm i react-native-collapsible-component-with-tab-view

or

yarn add react-native-collapsible-component-with-tab-view
```

## Run example

```sh
git clone https://github.com/Kwonkunkun/react-native-collapsible-component-with-tab-view.git

yarn

cd example & yarn & yarn ios or android
```

## Usage

```
...
import { CollapsibleTabBar } from 'react-native-collapsible-component-with-tab-view'

const App = () => {
  return (
    <SafeAreaView>
      <CollapsibleTabBar
        collasibleComponent={
          <View
            style={{
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 200, 1)',
            }}
          >
            <Text>Collapse Section</Text>
          </View>
        }
        tabBarItemList={[
          {
            titleComponent: (
              <View style={{ padding: 20 }}>
                <Text>tab1</Text>
              </View>
            ),
            component: ({tab1Component},
          },
          {
            titleComponent: (
              <View style={{ padding: 20 }}>
                <Text>tab2</Text>
              </View>
            ),
            component: {tab1Component},
          },
        ]}
      />
    </SafeAreaView>
  )
}

```

## Author

👤 **KunwooKwon(kunwoo242@gmail.com)**

- Website: https://kunkunwoo.tistory.com
- Github: [@Kwonkunkun](https://github.com/Kwonkunkun)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
