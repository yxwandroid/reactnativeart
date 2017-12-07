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
    Group,
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

        this.MousePostion = {
            firstX:0,
            firstY:0,
            x: 0,
            y: 0
        }
        this.firstX = 0;
        this.firstY = 0;
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
                console.log('-------------Grant-----------------');

                this.firstX = evt.nativeEvent.pageX
                this.firstY = evt.nativeEvent.pageY
            },//激活时做的动作
            onPanResponderMove: (evt, gestureState) => {

                this.MousePostion = {
                    firstX:this.firstX,
                    firstY:this.firstY,
                    x: this.firstX + gestureState.dx,
                    y: this.firstY + gestureState.dy
                }
                this.MousePostions.push(this.MousePostion);

                this.setState({
                    lastX: this.MousePostions[0].x + gestureState.dx,
                    lastY: this.MousePostions[0].y + gestureState.dy,
                })


            }, //移动时作出的动作

            onPanResponderRelease: (evt, gestureState) => {
                console.log('-----------------Release----------------');
                //  this.AllPostions.push(this.MousePostions)
                // this.MousePostions = []
            },///动作释放后做的动作

            onPanResponderTerminate: (evt, gestureState) => {
            },
        });

    }


    render() {

        const path = new Path();
        for (let i = 0; i < this.MousePostions.length; i++) {
            let tempFistX = this.MousePostions[i].firstX
            let tempFistY = this.MousePostions[i].firstY
            let tempX = this.MousePostions[i].x
            let tempY = this.MousePostions[i].y

            if (i == 0) {
                path.moveTo(tempFistX, tempFistY)
                path.lineTo(tempX, tempY)
                path.close();
            } else {
                let tempFistX_1 = this.MousePostions[i-1].firstX

                if(tempFistX==tempFistX_1){
                    let tempX_1 = this.MousePostions[i - 1].x
                    let tempY_1 = this.MousePostions[i - 1].y
                    path.moveTo(tempX_1, tempY_1)
                    path.lineTo(tempX, tempY)
                    path.close();
                }else {
                    path.moveTo(tempFistX, tempFistY)
                    path.lineTo(tempX, tempY)
                    path.close();
                }


            }

        }

        return (
            <View style={styles.container} {...this._panResponder.panHandlers} >
                <Surface width={width} height={height}>
                    <Group>
                        <Shape d={path} stroke="#000000" strokeWidth={1}/>
                    </Group>
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
