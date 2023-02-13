import React, { useEffect, useState } from "react";

export function HandleInputAPI (props) {
  const [counter, setCounter] = useState(0);
  const [list, setList] = useState([]);
  const [user, setUser] = useState('');

  const fetchAPI = async () => {
    const url = `https://assets.breatheco.de/apis/fake/todos/user/${user}`;
    let request = {
      method: 'GET',
      redirect: 'follow'
    };

    const response = await fetch(url, request);
    if(response.status === 200){
      const responseJSON = await response.json();
      responseJSON.map( (item) => {setList((e) => [...e, item.label]);} )}
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleAdd = (event) => {
    if (event.key === "Enter") {
      setList([...list, event.target.value]);
      setCounter(counter + 1);
      updateTodoList(list);
    } 
  };

  const generateUserinAPI = () => {

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify([]);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      setList([]);
  };


  const updateTodoList = (list) => {
    const todos = list.map(label => ({ label, done: false }));
  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify(todos);
  
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, requestOptions)
      .then(response => response.text())
      .then(data => console.log("Data updated", data))
      .catch(error => console.log('error', error));
  };
  
  const cleanAllTasks = () => {
    let request = {
      method: 'DELETE'
    };
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, request);
    setList([]);
    setCounter(0);
    updateTodoList([]);
  };

	return (
		<div className="text-center container">
			<h1>to do list</h1>
      <li className="newlistAPI">
        <input placeholder="New List Username" value={user} onChange={(e) => setUser(e.target.value)} />
        <button onClick={generateUserinAPI}>Click to create</button>
      </li>
      <ul>
 				<li><input onKeyDown={handleAdd} placeholder="What needs to be done?" value={props.list}/></li>
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
				<li id="fixedcounter"><small>{(counter===0) ? "No tasks, add a task" : counter + " items left"}</small></li>
			</ul>
      <button onClick={cleanAllTasks} id="cleanAll">Clean all tasks</button>

    </div>
	);
}
