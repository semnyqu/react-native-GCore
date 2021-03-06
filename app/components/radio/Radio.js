/**
 * Created by Leon.Hwa on 17/4/10.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
    ActivityIndicator,
    Platform
} from 'react-native';
import Original from '../airticle/Original'
import  Common from  '../../common/constants'
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
        this.page = 1
    }
    componentDidMount() {
        const  {actions} = this.props
        actions.getRadio()
    }

    renderRow(data,index){
        return(<Original original = {data} {...this.props} type = {'Volume'}/>)
    }
    _onRefresh(){
        const  {actions} = this.props
        this.page = 1
        console.log('正在刷新')
        actions.getRadio(this.page)
    }
    _onScrollEndDrag(event){
        const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
        let contentSizeH = contentSize.height;
        //layoutMeasurement.height 是listView的高度(小于 window.height)
        let viewBottomY = contentOffset.y + layoutMeasurement.height;

        console.log(viewBottomY - contentSizeH)
        if((viewBottomY - contentSizeH)>=40|| (Platform.OS === 'android' && parseInt(viewBottomY - contentSizeH) === 0)){
            const  {radio,actions} = this.props
            if(radio.isLoadMore){
                return
            }
            this.page++;
            actions.getRadio(this.page )
        }
    }
    render() {
        const {radio} = this.props
        const refreshWord = radio.isLoading ? '正在刷新':'下拉刷新'
        return (
            <View style={styles.container}>

                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(radio.data)}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}
                    scrollEventThrottle={200}
                    onScrollEndDrag = {this._onScrollEndDrag.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={radio.isLoading}
                            onRefresh={this._onRefresh.bind(this)}
                            colors={['rgb(217, 51, 58)']}
                            title={refreshWord}
                        />
                    }
                />
                {radio.isLoadMore &&
                <View style={styles.loadingContainer}>
                    <ActivityIndicator />
                    <Text style={{fontSize: 14, marginLeft: 5}}>正在加载更多的数据...</Text>
                </View>
                }
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
    loadingContainer: {
        height:30,
        width:Common.WINDOW.width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

