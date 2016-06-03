// Copyright (C) 2016 Goom Inc. All rights reserved.

import React, { PropTypes } from 'react';
import _ from 'lodash';

export default React.createClass({
  propTypes: {
    boxClassName: PropTypes.string,
    items: PropTypes.array,
    onChangeText: PropTypes.func,
    onSelectItem: PropTypes.func,
    placeholder: PropTypes.string,
    text: PropTypes.string,
    resetDropdown: PropTypes.func,
    deleteItem: PropTypes.func,
  },
  getInitialState() {
    return { cursorPosition: -1 };
  },
  render() {
    const { items, boxClassName, placeholder,
      onSelectItem, resetDropdown, text, onChangeText, deleteItem } = this.props;

    let cursorPosition = this.state.cursorPosition;

    const renderItem = (item, index) => (
      <div key={item.text}
        className={`dropdown-item ${cursorPosition === index ? 'cursor' : ''}`}
      >
        <div className="dropdown-item-content" onClick={() => onSelectItem(item)}>
          {item.text}
        </div>
        {deleteItem && !_.get(item, 'item.isNotRemovable') ?
          <span className="close-button" onClick={() => deleteItem(item)}>X</span>
          : null
        }
      </div>
    );
    const renderDropdown = () => {
      if (items && items.length > 0) {
        return [
          (<div key={`${boxClassName}-dropdown-box`} className="dropdown-box open">
            {items.map(renderItem)}
           </div>),
          (<div key={`${boxClassName}-dropdown-box-overlay`} className="popup-overlay transparent" onClick={resetDropdown}></div>), // eslint-disable-line
        ];
      }
      return (<div></div>);
    };
    const onBlur = () => {
      resetDropdown();
    };
    const onKeyEvent = (e) => {
      const keyCode = e.keyCode;
      const changeCuror = (next) => {
        if (next !== cursorPosition) {
          this.setState({ cursorPosition: next });
          // $(`.${boxClassName} input`).val(items[next].text);
        }
      };
      if (keyCode === 38) {
        // arrow up
        changeCuror(Math.max(cursorPosition - 1, -1));
      } else if (keyCode === 40) {
        // arrow down
        changeCuror(Math.min(cursorPosition + 1, items.length - 1));
      } else if (keyCode === 9) {
        // tab
        // 2016. 04. 20. [heekyu] blur event fires before dropdown click event
        // so, handle blur event manually
        onBlur();
      } else if (keyCode === 13) {
        // enter
        if (cursorPosition === -1) {
          cursorPosition = 0;
        }
        onSelectItem(items[cursorPosition]);
      }
    };
    const onChange = (e) => {
      onChangeText(e.target.value);
      if (this.state.cursorPosition >= 0) {
        this.setState({ cursorPosition: -1 });
      }
    };
    const onFocus = (e) => {
      onChangeText(e.target.value);
    };
    return (
      <div className={boxClassName}>
        <input type="text"
          placeholder={placeholder}
          defaultValue={text}
          onFocus={onFocus}
          onChange={onChange}
          onKeyDown={onKeyEvent} // onKeyPress does not work for arrow up(38), down(40)
        />
        {renderDropdown()}
      </div>
    );
  },
});
