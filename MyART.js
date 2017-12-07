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
export default class MyART extends PureComponent {


    constructor(props) {
        super(props);


    }


    render() {
        const path = new Path();
        // path.moveTo(30, 30)
        path.moveTo(30, 30)      //i=0
        path.lineTo(50, 50)
        path.close()

        path.moveTo(50, 50)
        path.lineTo(50, 80)
        path.close()

        path.moveTo(50, 80)
        path.lineTo(100, 80)
        path.close()

        path.moveTo(100, 80)
        path.lineTo(100, 120)
        path.close()

        path.moveTo(200, 80)
        path.lineTo(200, 120)
        path.close()


        // path.close();
        return (
            <View style={styles.container} >
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
