import React, { Component } from 'react';
import { Modal, Switch } from 'react-native';
import I18n from 'react-native-i18n';
import { AppHeader, ItemMore, NoInternet ,SelectionOptionGroupMulti,OptionButton} from '../../components';
import {
  AppView,
  AppText,
  AppButton,
  AppNavigation,
  moderateScale,
  AppIcon,
} from '../../common'; 
import { bindActionCreators } from 'redux';
import { setRestetTrue } from '../../actions/reset';
import {   setSelectedArrayOfFilter } from '../../actions/genralFilter'; 

import { connect } from 'react-redux';
 
class FilterModal extends Component {
  state = {
    modalVisible: true,
    reset: false,
    online: false,
    selectedArray: [0], 
  };
 componentWillMount(){
   this.setState({selectedArray:this.props.selectedArray})
 }

  applyButton = () => {
    const {selectedArray}=this.state
    console.log("TCL: FilterModal -> applyButton -> selectedArray", selectedArray)
     this.props.setSelectedArrayOfFilter(selectedArray);
    AppNavigation.pop();
  };

  resetButton = () => {
    console.log('ResetButton');
    this.props.onReset();
    this.setState({
      selectedArray: [0],
    });
  };
  renderOption=(item, index) => {
    return (
      <OptionButton
        text={item.text}
        value={item.value}
        key={index + 1}
        tagScroll
        touchableOpacity 
      />
    );
  }
 selectInput=()=>{
  const {options}=this.props
  const {selectedArray}=this.state
   return(<SelectionOptionGroupMulti 
    initialValue={selectedArray}
    defaultValue={[0]}
    multi={true}
    onSelect={(values)=>{
      console.log("TCL: FilterModal -> selectInput -> values", values)
      this.setState({selectedArray:values})
    }}
  
    reset={this.props.reset}
    
  >
   

    {options &&  options.map(this.renderOption)}
  </SelectionOptionGroupMulti>)
 }
  renderSelectInput=()=>{
   
    return(
      <AppView stretch>
        <AppView stretch>
          <AppText size={7} marginHorizontal={5} color="#212121" marginTop={5}>
            {this.props.label}
          </AppText>
           {this.selectInput()}
         </AppView>
        <AppView
          stretch
          height={0.1}
          backgroundColor="#B9B9B9"
          marginBottom={5}
        />
      </AppView>
    );
  }
  renderContent = () => (
    <>
       {this.renderSelectInput()}
      
      
      <AppButton
        touchableOpacity
        title={I18n.t('apply')}
        noBorder
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 50,
        }}
        onPress={() => {
          this.applyButton();
        }}
      />
    </>
  );

  render() {
    return (
      <AppView
        flex
        stretch
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'white',
        }}
      >
        <AppHeader
          touchableOpacity
          title={I18n.t('filter')}
          refresh={this.resetButton}
        />
        {this.props.isConnected ? this.renderContent() : <NoInternet />}
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  reset: state.reset.reset,

  isConnected: state.network.isConnected 
});

const mapDispatchToProps = dispatch => ({
  onReset: bindActionCreators(setRestetTrue, dispatch),
  setSelectedArrayOfFilter: bindActionCreators(setSelectedArrayOfFilter, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterModal);
