import React, { useState } from "react";

export function HandleInput (props) {

    const [counter, setCounter] = useState(0);
    const [list, setList] = useState([]);

    const handleAdd = (event) => {
        if (event.key === "Enter") {
          setList([...list, event.target.value]);
          setCounter(counter + 1);
          event.target.value = "";
        } 
      };

      const handleX = (event) => {
        const index = list.indexOf(event.target.previousSibling.data);
        if (index !== -1) {
          setList([...list.slice(0, index), ...list.slice(index + 1)]);
          setCounter(counter - 1);
        }
    };
    

	return (
		<div className="text-center container">
			<h1>todos</h1>
			<ul>
 				<li><input onKeyDown={handleAdd} placeholder="What needs to be done?" value={props.list}/></li>
                {list.map((item, index) => (
                    <li key={index}>{item}<span onClick={handleX}>X</span></li>
                ))}
				<li id="fixedcounter"><small>{(counter===0) ? "No tasks, add a task" : counter + " items left"}</small></li>
			</ul>
		</div>
	);
}

