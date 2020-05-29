import React, { useState } from 'react';
import './App.css';

function Header() {
    const [tabs, setTabs] = useState([])
    const [curValue, setCurValue] = useState('')
    function handleClick() {
        if (curValue !== "") {
            setTabs(tabs.concat(curValue));
            setCurValue("");
        }
    }

    function deleteTab(ind) {
        let newArr = [...tabs];
        newArr.splice(ind, 1)
        setTabs(newArr);
    }
  return (
    <div>
        {tabs.map((tab, index) => (
            <button key={index}>{tab}</button>
        ))}
        <p>Step 1: Add New Tabs</p>
        <input onChange={event => setCurValue(event.target.value)} value={curValue} />
        <button onClick={handleClick}>Add</button>
        <p>Step 2: Delete Tab You Don't Want</p>
        <p>Tabs List</p>
        {tabs.map((tab, index) => (
            <div key={index}>
                <p>{index + 1}: {tab}</p>
                <button onClick={() => deleteTab(index)}>Delete</button>
            </div>
        ))}
    </div>
  );
}

export default Header;