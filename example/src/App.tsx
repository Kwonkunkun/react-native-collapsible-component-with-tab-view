import React, { useEffect } from 'react'
import {
  Image,
  SafeAreaView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
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
            component: (
              <View>
                <Image
                  source={{ uri: 'https://picsum.photos/200' }}
                  style={{
                    width: 200,
                    height: 200,
                    resizeMode: 'stretch',
                  }}
                />
              </View>
            ),
          },
          {
            titleComponent: (
              <View style={{ padding: 20 }}>
                <Text>tab2</Text>
              </View>
            ),
            component: (
              <View>
                <Image
                  source={{ uri: 'https://picsum.photos/200' }}
                  style={{
                    width: 200,
                    height: 200,
                    resizeMode: 'stretch',
                  }}
                />
              </View>
            ),
          },
        ]}
      />
    </SafeAreaView>
  )
}

export default App
