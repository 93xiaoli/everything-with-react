import React, { useState } from 'react';
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

import './Header.css';

class Header extends React.Component {
    state = {
        tabs: [],
        curValue: "",
        headerHeight: 64,
        tabPadding: 16,
        tabAlign: 'left',
        displayColorPicker: false,
        color: {
          r: '241',
          g: '112',
          b: '19',
          a: '1',
        },
      };
      
    handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
    this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
    this.setState({ color: color.rgb })

    };
    
    addTab = () => {
        if (this.state.curValue !== "") {
            this.setState({tabs: this.state.tabs.concat(this.state.curValue)});
            this.setState({curValue: ""})
        }
    }

    deleteTab = (ind) => {
        let newArr = [...this.state.tabs];
        newArr.splice(ind, 1)
        this.setState({tabs: newArr});
    }

    render() {
        const styles = reactCSS({
          'default': {
            header: {
                display: 'flex',
                justifyContent: `${this.state.tabAlign}`,
                height: `${this.state.headerHeight}px`,
                background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
            },
            tab: {
                background: 'none',
                border: 'none',
                padding: `0 ${this.state.tabPadding}px`,
            },
            color: {
              width: '36px',
              height: '14px',
              borderRadius: '2px',
              background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
            },
            swatch: {
              padding: '5px',
              background: '#fff',
              borderRadius: '1px',
              boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
              display: 'inline-block',
              cursor: 'pointer',
            },
            popover: {
              position: 'absolute',
              zIndex: '2',
            },
            cover: {
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            },
          },
        });

  return (
    <div>
        <div style={ styles.header }>
            {this.state.tabs.map((tab, index) => (
                <button key={index} style={ styles.tab } >{tab}</button>
            ))}
        </div>
        <div className="Section">
            <p>Step 1: Add New Tabs</p>
            <input onChange={event => this.setState({curValue: event.target.value})} value={this.state.curValue} />
            <button onClick={this.addTab}>Add</button>
            <p>Step 2: Delete Tab You Don't Want</p>
            <p>Tabs List</p>
            {this.state.tabs.map((tab, index) => (
                <div key={index} className="Flex">
                    <p>{index + 1}: {tab}</p>
                    <button onClick={() => this.deleteTab(index)}>Delete</button>
                </div>
            ))}
            <p>Step 3: Choose the Background Color for Header</p>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
            </div> : null 
        }
        {`rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`}        
        <p>Step 4: Set the Height for Header</p>
        <input type='number' min="0" value={this.state.headerHeight} onChange={event => this.setState({headerHeight: event.target.value})}/>px
        <p>Step 5: Set the Tab Padding</p>
        <input type='number' min="0" value={this.state.tabPadding} onChange={event => this.setState({tabPadding: event.target.value})}/>px
        <p>Step 5: Set the Tab Align</p>
        <button onClick={() => this.setState({tabAlign: 'flex-start'})}>Left</button>
        <button onClick={() => this.setState({tabAlign: 'center'})}>Center</button>
        <button onClick={() => this.setState({tabAlign: 'flex-end'})}>Right</button>
        </div>
    </div>

  )}};

export default Header;