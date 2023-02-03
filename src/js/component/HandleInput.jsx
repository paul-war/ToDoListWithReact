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

    const handleX = () => {

    }
    

	return (
		<div className="text-center container">
			<h1>todos</h1>
			<ul>
 				<li><input onKeyDown={handleAdd} type={list}/></li>
                {list.map((item, index) => (
                    <li key={index}>{item}<span>X</span></li>
                ))}
				<li id="fixedcounter"><small>{(counter===0) ? "No tasks, add a task" : counter + " items left"}</small></li>
			</ul>
		</div>
	);
}