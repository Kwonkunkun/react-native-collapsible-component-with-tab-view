import React, { useEffect, useRef, useState } from 'react'
import { ReactElement } from 'react'
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import styled from 'styled-components/native'

const BACKGROUND_COLOR = '#ffffff'
const LINE_COLOR = '#F0F0F0'

type TabBarItem = {
  titleComponent?: ReactElement
  component?: ReactElement
}

type CollapsibleTabBarProps = {
  collasibleComponent: ReactElement
  tabBarItemList: TabBarItem[]
  tabBarIndicatorColor?: string
}

/**
 * CollapsibleTabBar
 *
 * 주의사항:
 * 1. tabBarItem의 title을 key값으로 사용합니다.
 * 2. tabBarIndicatorColor의 default: black
 */

export const CollapsibleTabBar = ({
  collasibleComponent,
  tabBarItemList,
  tabBarIndicatorColor = 'black',
}: CollapsibleTabBarProps) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions()

  const [isLoadCollapseSectionLayout, setIsLoadLayoutCollapseSectionLayout] =
    useState(false)
  const [isLoadTabSectionLayout, setIsLoadTabSectionLayout] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)

  const horizontalScrollViewRef = useRef<ScrollView>(null)
  const verticalScrollViewListRef = useRef<Animated.ScrollView[]>(
    Array(tabBarItemList.length)
  )
  const verticalScrollYListRef = useRef<number[]>(
    Array(tabBarItemList.length).fill(0)
  )

  //animation value
  const tabSectionHeight = useSharedValue(0)
  const collapsibleSectionHeight = useSharedValue(0)
  const indicatorTranslateX = useSharedValue(0)
  const scrollY = useSharedValue(0)

  //#region vertical scroll
  const collapseAnimatedStyles = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, collapsibleSectionHeight.value],
      [collapsibleSectionHeight.value, 0],
      {
        extrapolateRight: Extrapolate.CLAMP,
      }
    )
    const translateY = interpolate(
      scrollY.value,
      [0, collapsibleSectionHeight.value],
      [0, -collapsibleSectionHeight.value],
      {
        extrapolateRight: Extrapolate.CLAMP,
      }
    )

    const opacity = interpolate(
      scrollY.value,
      [0, collapsibleSectionHeight.value],
      [1, 0],
      {
        extrapolateRight: Extrapolate.CLAMP,
      }
    )

    return {
      height: height,
      opacity: opacity,
      transform: [
        {
          translateY: translateY,
        },
      ],
    }
  })

  const syncVerticalScrollY = () => {
    if (!verticalScrollViewListRef.current || !verticalScrollYListRef.current) {
      return
    }

    verticalScrollViewListRef.current.forEach((item, idx) => {
      if (!item) {
        return
      }

      //포커싱 되어있지 않은 view일때
      if (idx !== currentIdx) {
        if (
          scrollY.value <= collapsibleSectionHeight.value &&
          scrollY.value >= 0
        ) {
          item.scrollTo({
            y: scrollY.value,
            animated: false,
          })
          verticalScrollYListRef.current[idx] = scrollY.value
        } else if (scrollY.value > collapsibleSectionHeight.value) {
          if (
            verticalScrollYListRef.current[idx] <=
            collapsibleSectionHeight.value
          ) {
            item.scrollTo({
              y: collapsibleSectionHeight.value,
              animated: false,
            })
            verticalScrollYListRef.current[idx] = scrollY.value
          }
        }
      }
      //포커싱 되어있는 view일때
      else {
        verticalScrollYListRef.current[idx] = scrollY.value
      }
    })
  }

  const onVerticalScrollHandler = useAnimatedScrollHandler({
    onScroll(event) {
      scrollY.value = event.contentOffset.y
    },

    onEndDrag() {
      runOnJS(syncVerticalScrollY)()
    },

    onMomentumEnd() {
      runOnJS(syncVerticalScrollY)()
    },
  })

  //#endregion

  //#region horizontalScroll

  const indicatorAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: indicatorTranslateX.value,
        },
      ],
    }
  })

  const styles = StyleSheet.create({
    indicator: {
      position: 'absolute',
      backgroundColor: tabBarIndicatorColor,
      width: windowWidth / tabBarItemList.length,
      height: 2,
      bottom: 0,
    },
  })

  const onClickTabButton = (idx: number) => {
    if (idx === currentIdx) {
      return
    }
    setCurrentIdx(idx)
  }

  const onHorizontalScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    indicatorTranslateX.value = event.nativeEvent.contentOffset.x / 2
  }

  const onHorizontalSrcollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const targetIdx = Math.floor(
      event.nativeEvent.contentOffset.x / windowWidth
    )
    setCurrentIdx(targetIdx)
  }

  //#endregion

  const onLayoutCollapseSection = (event: LayoutChangeEvent) => {
    if (isLoadCollapseSectionLayout === true) {
      return
    }

    const { height } = event.nativeEvent.layout
    collapsibleSectionHeight.value = height
    setIsLoadLayoutCollapseSectionLayout(true)
  }

  const onLayoutTabSection = (event: LayoutChangeEvent) => {
    if (isLoadTabSectionLayout === true) {
      return
    }

    const { height } = event.nativeEvent.layout
    tabSectionHeight.value = height
    setIsLoadTabSectionLayout(true)
  }

  useEffect(() => {
    if (horizontalScrollViewRef.current) {
      horizontalScrollViewRef.current.scrollTo({ x: windowWidth * currentIdx })
    }
  }, [currentIdx, windowWidth])

  return (
    <Container>
      <ScrollView
        hitSlop={{ left: -50 }}
        bounces={false}
        ref={horizontalScrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onHorizontalScroll}
        onMomentumScrollEnd={onHorizontalSrcollEnd}
        scrollEventThrottle={16}
      >
        {tabBarItemList.map((item, idx) => {
          return (
            <Animated.ScrollView
              ref={(ref) => (verticalScrollViewListRef.current[idx] = ref!)}
              key={idx}
              onScroll={onVerticalScrollHandler}
              scrollEventThrottle={16}
              // eslint-disable-next-line react-native/no-inline-styles
              contentContainerStyle={{
                width: windowWidth,
                backgroundColor: 'white',
                minHeight: windowHeight + collapsibleSectionHeight.value,
              }}
            >
              <View
                style={{
                  height:
                    collapsibleSectionHeight.value + tabSectionHeight.value,
                }}
              />
              {item.component}
            </Animated.ScrollView>
          )
        })}
      </ScrollView>

      <CollasibleComponentBox>
        <Animated.View
          style={[isLoadCollapseSectionLayout ? collapseAnimatedStyles : null]}
          onLayout={onLayoutCollapseSection}
        >
          {collasibleComponent}
        </Animated.View>
        <TabBarBox windowWidth={windowWidth} onLayout={onLayoutTabSection}>
          {tabBarItemList.map((item, idx) => (
            <TabBarItem
              key={idx}
              onPress={() => {
                onClickTabButton(idx)
              }}
            >
              {item.titleComponent}
            </TabBarItem>
          ))}
          <Animated.View style={[styles.indicator, indicatorAnimatedStyles]} />
        </TabBarBox>
      </CollasibleComponentBox>
    </Container>
  )
}

const Container = styled.View({})

const CollasibleComponentBox = styled.View({
  position: 'absolute',
  width: '100%',
  backgroundColor: BACKGROUND_COLOR,
})

const TabBarBox = styled.View<{ windowWidth: number }>(({ windowWidth }) => ({
  width: windowWidth,
  // padding: '20px 0px 20px 0px',
  flexDirection: 'row',
  alignContent: 'center',
  borderBottomWidth: 1,
  backgroundColor: BACKGROUND_COLOR,
  borderBottomColor: LINE_COLOR,
}))

const TabBarItem = styled.TouchableOpacity({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
})
