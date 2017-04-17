/**
 * Created by Leon.Hwa on 17/4/10.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';
import Original from '../airticle/Original'

export default class Radio extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        }
    }
    componentDidMount() {
        const  {actions} = this.props
        actions.getRadio()
    }

    renderRow(data,index){
        return(<Original original = {data} {...this.props} type = {'radio'}/>)
    }
    render() {
        const {radio} = this.props
        console.log(radio)
        return (
            <View style={styles.container}>

                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(radio.data)}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
