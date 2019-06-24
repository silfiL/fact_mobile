import React, { Component } from 'react';
import { Platform, StatusBar, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import { HeaderBackButton } from '../../components/HeaderBackButton';
import Icon from 'react-native-vector-icons/FontAwesome'
import Color from '../../config/Color'

import { styles } from './styles'

export default class ViewArticle extends Component {
    constructor(props){
      super(props);
      this.state = {
        title: "VIEW ARTICLE"
      }
    }
    componentWillMount() {
        StatusBar.setBarStyle('light-content');

        if (Platform.OS === 'android') {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.2)', true);
        }
    }

    back = () => {
      this.props.navigation.goBack();
    }

    onContentScroll = () => {
      this.setState({title:"Article's Title"})
    }

    renderContent = () => (
        <ScrollView>
          <View style={styles.viewContent}>
          <Text style={[styles.text,styles.title]}>TITLE</Text>
          <View style={[styles.row,styles.spaceBetween,styles.below]}>
            <Text style={styles.text}>By : Author Name</Text>
            <Text style={styles.text}>Monday, 6 May 2019</Text>
          </View>
          <View style={[styles.row,styles.below]}>
          <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue vehicula justo id gravida. Fusce dignissim venenatis fermentum. Sed porttitor viverra felis sit amet viverra. Sed sollicitudin ultrices fringilla. Nullam et nibh egestas, pellentesque diam ac, vestibulum nulla. Maecenas maximus felis turpis, quis vehicula massa mollis facilisis. Ut cursus, nulla vel lacinia tristique, augue purus luctus enim, eget hendrerit neque sapien eu est. Ut dictum mattis urna quis varius. Maecenas facilisis congue leo, ut euismod erat finibus a. Ut facilisis tempus odio, eget tristique sem interdum sed. Vestibulum ornare id augue quis vestibulum. Integer pulvinar ex vel purus aliquet, ac vehicula elit tempus.

Quisque elementum, augue quis interdum fringilla, quam augue hendrerit mi, eu egestas risus libero in nisi. Aliquam erat volutpat. Fusce semper euismod posuere. Cras lacinia luctus placerat. Aenean lacinia massa est, non vehicula nisi porta non. Vivamus non nisl placerat, euismod lacus ut, dictum ex. Nunc quam massa, cursus sed venenatis eget, sagittis in sem. Phasellus nibh eros, molestie quis ante sit amet, congue facilisis purus.

Nulla sagittis metus risus, et pellentesque dui varius quis. Nullam gravida diam lacinia nunc mollis, id varius elit posuere. Suspendisse potenti. Suspendisse tincidunt, ex vitae tincidunt tempor, nisl felis dapibus odio, sit amet facilisis odio risus facilisis arcu. Sed faucibus, ligula eu gravida iaculis, erat metus eleifend dui, at lacinia ligula sapien in est. Mauris ultricies tortor condimentum tellus auctor maximus. Ut quis pretium quam. Suspendisse urna ipsum, ultricies vitae risus at, finibus tempor lectus. Mauris sollicitudin est posuere pretium pharetra. Ut id ligula quis sapien tincidunt porta. Aenean pretium nunc id magna gravida consequat. Morbi efficitur hendrerit posuere. Aliquam erat volutpat. Vivamus sit amet accumsan ex.

Sed consectetur, leo eu sagittis vulputate, velit ipsum dictum sapien, nec dictum tellus ligula vel leo. Duis vitae tellus eu sapien bibendum hendrerit. Curabitur hendrerit auctor cursus. Donec augue mi, hendrerit eu malesuada quis, efficitur vitae metus. Nunc tempus eget ex nec fermentum. In hac habitasse platea dictumst. Suspendisse purus quam, ultricies vel ex ut, pulvinar rutrum dolor. Aliquam rhoncus efficitur viverra. Aliquam id turpis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ullamcorper sit amet nibh sit amet dignissim. Aenean vestibulum enim libero, in sagittis tortor pellentesque at.

Cras congue maximus quam in elementum. Nam lectus felis, viverra ac ipsum a, semper vulputate mi. Vestibulum sit amet ornare enim, nec scelerisque augue. Vivamus a facilisis neque. Duis et blandit justo. Fusce facilisis dolor nunc, a aliquam nisi semper sed. Nullam vel turpis eu urna luctus dictum in nec lorem. Sed eget varius ipsum. Quisque in tincidunt nibh. Integer lobortis tristique nisl eu cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean ut efficitur eros, sit amet pulvinar massa. Ut venenatis finibus urna sit amet sagittis.</Text>
          
          </View>
          <View style={styles.row}>
            <Icon name="group" size={16} color={Color.FONT_GREY} />
            <Text style={[styles.text,styles.left]}>30 views</Text>
          </View>
        </View>
        </ScrollView>
    );

    renderNavBar = () => (
        <HeaderBackButton title={this.state.title} iconColor={Color.APP_WHITE} onPressBack={this.back}/>
    );

    render() {
        return (
            <CollapsibleToolbar
                onContentScroll={this.onContentScroll}
                renderContent={this.renderContent}
                renderNavBar={this.renderNavBar}
                imageSource="https://cdn.th3rdwave.coffee/articles/rkvHXu_Il/rkvHXu_Il-1100-700.jpg"
                collapsedNavBarBackgroundColor={Color.YELLOW}
                translucentStatusBar
                showsVerticalScrollIndicator={false}
            />
        );
    }
}