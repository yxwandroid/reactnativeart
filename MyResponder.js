import React, {PureComponent, Component} from 'react';
import {
    StyleSheet,
    View,
    ART,
    PanResponder,
} from 'react-native';

const {
    Shape,
    Surface,
    Path
} = ART


export default class MyResponder extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            firstX: 0,
            firstY: 0,
            lastX: 0,
            lastY: 0

        };
        this.MousePostion = {x: 0, y: 0}
        this.allPostions=[]
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
                console.log(`Grant:  firstX: ${evt.nativeEvent.pageX}   firstY : ${evt.nativeEvent.pageY}`);
                this.MousePostion = {
                    x: evt.nativeEvent.pageX,
                    y: evt.nativeEvent.pageY,
                }
                this.MousePostions.push(this.MousePostion);

                // this.setState({
                //     firstX: evt.nativeEvent.pageX,
                //     firstY: evt.nativeEvent.pageY,
                //
                // })


            },//激活时做的动作
            onPanResponderMove: (evt, gestureState) => {
                console.log(`dx : ${gestureState.dx}   dy : ${gestureState.dy}`);
                this.MousePostion = {
                    x: this.MousePostions[0].x + gestureState.dx,
                    y: this.MousePostions[0].y + gestureState.dy
                }
                this.MousePostions.push(this.MousePostion);

                this.setState({
                    lastX: this.state.firstX + gestureState.dx,
                    lastY: this.state.firstY + gestureState.dy,
                })



            }, //移动时作出的动作

            onPanResponderRelease: (evt, gestureState) => {
                console.log('Release');

                this.allPostions.push(this.MousePostions);
                this.MousePostions=[];
            },///动作释放后做的动作

            onPanResponderTerminate: (evt, gestureState) => {
            },
        });

    }


    render() {

        const path = new Path()

        for(let i=0;i<this.MousePostions.length;i++){
            const tempX=this.MousePostions[i].x
            const tempY=this.MousePostions[i].y
            if(i=0){
                path.moveTo(tempX,tempY)
            }else {
                path.lineTo(tempX, tempY)
            }
        }

        console.log('画笔数据'+JSON.stringify(this.MousePostions))
       // path.close()
        return (
            <View style={styles.container} {...this._panResponder.panHandlers} >
                <Surface width={800} height={800}>
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
