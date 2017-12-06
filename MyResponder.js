import React, {PureComponent, Component} from 'react';
import {
    StyleSheet,
    View,
    ART,
    Dimensions,
    PanResponder,
} from 'react-native';

const {
    Shape,
    Surface,
    Path
} = ART
//获取屏幕的宽高
const {width, height} = Dimensions.get('window');
export default class MyResponder extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            lastX: 0,
            lastY: 0

        };

        this.firstX = 0;
        this.firstY = 0;
        this.MousePostion = {x: 0, y: 0}

        this.MousePostions = []
    }


    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onPanResponderGrant: (evt, gestureState) => {
                // console.log(`Grant:  firstX: ${evt.nativeEvent.pageX}   firstY : ${evt.nativeEvent.pageY}`);
                console.log('-------------Grant-----------------');

                this.firstX = evt.nativeEvent.pageX;
                this.firstY = evt.nativeEvent.pageY;

                this.MousePostion = {
                    x: this.firstX,
                    y: this.firstY
                }
                this.MousePostions.push(this.MousePostion);

            },//激活时做的动作
            onPanResponderMove: (evt, gestureState) => {
                // console.log(`dx : ${gestureState.dx}   dy : ${gestureState.dy}`);

                this.MousePostion = {
                    x: this.firstX + gestureState.dx,
                    y: this.firstY + gestureState.dy
                }
                this.MousePostions.push(this.MousePostion);

                this.setState({
                    lastX: this.firstX + gestureState.dx,
                    lastY: this.firstY + gestureState.dy,
                })


            }, //移动时作出的动作

            onPanResponderRelease: (evt, gestureState) => {
                console.log('-----------------Release----------------');
                this.MousePostions = []
            },///动作释放后做的动作

            onPanResponderTerminate: (evt, gestureState) => {
            },
        });

    }


    render() {

        const path = new Path()
        for (let i = 0; i < this.MousePostions.length; i++) {
            let tempX = this.MousePostions[i].x
            let tempY = this.MousePostions[i].y
            if (i == 0) {
                path.moveTo(tempX, tempY)
            } else {
                path.lineTo(tempX, tempY)
            }


        }
        return (
            <View style={styles.container} {...this._panResponder.panHandlers} >
                <Surface width={width} height={height}>
                    <Shape d={path} stroke="#000000" strokeWidth={1}/>
                </Surface>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // width: 300,
        // height: 300,
        flex: 1,
    },
});
