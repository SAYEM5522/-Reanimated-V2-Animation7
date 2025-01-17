import React, { useState } from 'react';
import { StyleSheet, Text, View ,FlatList, StatusBar,Image, ScrollView} from 'react-native';
import Animated, { Extrapolate, interpolate, interpolateColor, useAnimatedGestureHandler, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Product from './Component/Product';
// import ProductDetails from './Component/ProductDetails';
import { Item } from "./Component/Data";
// import ProductList from './Component/ProductList';
import { PanGestureHandler } from 'react-native-gesture-handler';

export default function App() {


const Y = useSharedValue(0);
const config={
  mass:0.8,
  damping:16,
  overshootClamping:false,
  restDisplacementThreshold:1,
  restSpeedThreshold:0.1
}
const config2={
  mass:0.3,
  damping:10,
  overshootClamping:false,
  restDisplacementThreshold:1,
  restSpeedThreshold:0.1
}
const config3={
  mass:0.5,
  damping:16,
  overshootClamping:false,
  restDisplacementThreshold:4,
  restSpeedThreshold:0.1
}
function clamp(value, lowerBound, upperBound) {
  'worklet';
  return Math.max(lowerBound, Math.min(value, upperBound));
}
const gestureHandler = useAnimatedGestureHandler({
  onStart: (_, ctY) => {
    ctY.startX = Y.value;
  },
  onActive: (event, ctY) => {
    Y.value = ctY.startX + event.translationY;
  
  },
  onEnd: (_evt) => {
    Y.value = withSpring(0,config);
    if(Y.value>20){
      Y.value=90
    }
   
  },
});
const LineAnimation=useAnimatedStyle(()=>{
  return{
    transform:[
      {
      rotateZ:-48+"deg"
    },
    {
      translateY:30
    },{
      translateX:-15
    }
  ],
  elevation:interpolate(Y.value,[0,10],[5,0],Extrapolate.CLAMP)
  
  }
})
const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [
      {
        translateY:clamp( Y.value,0,90)
      },
    ],
    height:interpolate(Y.value,[0,90],[250,450],Extrapolate.CLAMP)
  };
});

const ImageAnimation =useAnimatedStyle(()=>{
  return{
    
    transform:[
      {
      scale:interpolate(Y.value,[0,60],[1,2.5],Extrapolate.CLAMP)
    },
  {
    translateY:interpolate(Y.value,[0,20,40,60],[0,6,10,0],Extrapolate.CLAMP)
  },
  {
    translateX:interpolate(Y.value,[0,20,40,60],[0,20,30,30],Extrapolate.CLAMP)
  }
],
    height:(Y.value>60)?withSpring(252,config3):withSpring(170,config2)
  }
})
const ImageTransForm=useAnimatedStyle(()=>{
  return{
    transform:[{
      translateY:withSpring( interpolate(Y.value,[0,70],[0,80],Extrapolate.CLAMP),config)
    }]
  }
})
const BottomContainerAnimation=useAnimatedStyle(()=>{
  return{
    transform:[{
      translateY:withSpring(interpolate(Y.value,[0,90],[0,147],Extrapolate.CLAMP),config)
    }],
    height:withSpring(interpolate(Y.value,[0,60],[130,110],Extrapolate.CLAMP),config),
    top:interpolate(Y.value,[0,60],[-220,-270],Extrapolate.CLAMP),
  }
})


const translationY = useSharedValue(0);
 
const AnimatedFlatList=Animated.createAnimatedComponent(FlatList);
const scrollHandler = useAnimatedScrollHandler((event) => {
  translationY.value = event.contentOffset.y;
  
  
});
const ConTainerAnimation=useAnimatedStyle(()=>{
  return{
    width:interpolate(translationY.value,[0,100],[360,120],Extrapolate.CLAMP),
    height:interpolate(translationY.value,[0,100],[130,45],Extrapolate.CLAMP),
    transform:[{
      translateY:interpolate(translationY.value,[0,100],[0,130],Extrapolate.CLAMP),
    },
    {
      translateX:interpolate(translationY.value,[0,100],[0,120],Extrapolate.CLAMP),
    }
  ],
    zIndex:100
  }
})
const BottomListTransForm=useAnimatedStyle(()=>{
  return{
    top:interpolate(Y.value,[0,60],[55,-100],Extrapolate.CLAMP),
    transform:[{
      translateY:interpolate(Y.value,[0,60],[0,110],Extrapolate.CLAMP),
    }],
    backgroundColor:interpolateColor(Y.value,[0,70],["rgb(211,211,211)","(0°,0%,100%)"]),
    opacity:interpolate(translationY.value,[0,100],[1,0],Extrapolate.CLAMP),
  }
})
   const ConTainerImage=useAnimatedStyle(()=>{
     return{
       opacity:interpolate(translationY.value,[0,20],[1,0],Extrapolate.CLAMP)
     }
   })
   const ConTainerTextA=useAnimatedStyle(()=>{
    return{
      opacity:interpolate(translationY.value,[0,10],[1,0],Extrapolate.CLAMP)
    }
  })
  const ConTainerTextTransform=useAnimatedStyle(()=>{
    return{
      transform:[{
        translateY:interpolate(translationY.value,[0,100],[20,-20],Extrapolate.CLAMP)
 
      }]
    }
  })
const backgrounAnimation=useAnimatedStyle(()=>{
  return{
    backgroundColor:(Y.value>70)&&"rgba(0,0,0,0.96)"
  }
})
const TextTransform=useAnimatedStyle(()=>{
  return{
   top:interpolate(Y.value,[0,60],[0,-100],Extrapolate.CLAMP)
  }
})
const renderItem=({item,index})=>{
  return(
    <View>
     {
        (index==0)?
        
        <>
        <PanGestureHandler
          activeOffsetX={[-50, 40]}
          activeOffsetY={[-10, 10]}
        onGestureEvent={gestureHandler}>
        
        <Animated.View style={[styles.container,animatedStyle]}>
          <Animated.View style={[styles.ImageContainer,ImageAnimation]}>
        
        <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={150}
        decelerationRate={'fast'}
        >
          {
            Item.map((item,index)=>{
              return(
                <View key={index}>
                        <Animated.Image
                source={{uri:item.img}}
                style={[styles.Image2]}
                />
                </View>

              )
            })
          }
        </ScrollView>
          {/* <Animated.Image
          source={{uri:'https://www.pngarts.com/files/2/Shoes-Transparent-Background-PNG.png'}}
          style={[styles.Image,ImageTransForm]}
          /> */}
       
          <StatusBar/>
           </Animated.View>
        </Animated.View>
        </PanGestureHandler>
        <Animated.Text style={[styles.Title,TextTransform]}>FREE METCON 3</Animated.Text>
        <Animated.View style={[styles.BottomList,BottomListTransForm]}>
          <Text style={styles.BottomListText1}>Last One</Text>
          <Text style={styles.BottomListText2}>CJ6314-146</Text>
        </Animated.View>

        </>
        
        :<Product Y={Y} color={item.color} translationY={translationY} />
     }
    </View>
  )
}
  return (
    <>
    <Animated.View style={[styles.Line,LineAnimation]}/>
    <Animated.View style={[styles.Container2,backgrounAnimation]}>
      <AnimatedFlatList
      data={Item}
      keyExtractor={(item)=>item.id}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      
      />
    </Animated.View>
    <Animated.View style={[styles.BottomContainer,BottomContainerAnimation,ConTainerAnimation]}>
          <Animated.Text style={[styles.BottomContainerText1,ConTainerTextA]}>210</Animated.Text>
          <Animated.Text style={[styles.BottomContainerText2,ConTainerTextTransform]}>U160</Animated.Text>
          <Animated.Image
          source={{uri:'https://freepngimg.com/thumb/shoes/27428-5-nike-shoes-transparent-background.png'}}
          style={[styles.BottomContainerImage,ConTainerImage]}
          />
        </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  Container2:{
    top:-5
  },
  Line:{
    height:5,
    width:46,
    backgroundColor:'black',
    borderRadius:3,
    zIndex:100,
    shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  },
  container: {
    width:"100%",
    height:250,
 
  },
  ImageContainer:{
    height:170,
    width:170,
    borderRadius:15,
    backgroundColor:"#B6E3DB",
    zIndex:100,
    position:'relative',
    left:50,
    top:50
  },
  Image:{
    height:120,
    width:120,
    top:10,
    left:10,
    bottom:50,
    borderRadius:15,
    position:'absolute',
    resizeMode:'contain'
  },
  Image2:{
      height:150,
      width:150,
      zIndex:100,
  },
  BottomContainer:{
    width:"84%",
    alignSelf:'center',
    height:130,
    backgroundColor:'black',
    borderRadius:36,
    marginBottom:-55,
   
 
  },
  BottomContainerText1:{
    color:'white',
    left:25,
    top:20,
    
  },
  BottomContainerText2:{
    color:'white',
    fontSize:28,
    fontWeight:'900',
    // top:20,
    left:20
  },
  BottomList:{
    height:110,
    width:'84%',
    backgroundColor:'lightgray',
    alignSelf:'center',
    top:55,
    borderTopLeftRadius:36,
    borderTopRightRadius:36,
   
    
  },
  BottomListText1:{
    color:'gray',
    fontSize:16,
    fontWeight:'bold',
    left:20,
    top:20,
  
  },
  BottomListText2:{
    left:200,
    color:'gray',
    fontSize:15,
    fontWeight:'bold'
  },
  Title:{
    fontSize:38,
    fontWeight:'bold',
    color:'black',
    width:"65%",
    left:50,
    zIndex:-1000
  },
  BottomContainerImage:{
    width:120,
    height:70,
    resizeMode:'contain',
    left:220,
    top:-30
  }
});
