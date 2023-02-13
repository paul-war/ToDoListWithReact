import React, { useEffect, useState } from "react";

export function HandleInputAPI (props) {
  const [counter, setCounter] = useState(0);
  const [list, setList] = useState([]);
  const [user, setUser] = useState('');

  
  //FETCH API

  const fetchAPI = async () => {
    const url = `https://assets.breatheco.de/apis/fake/todos/user/${user}`;
    let request = {
      method: 'GET',
      redirect: 'follow'
    };

    const response = await fetch(url, request);
    if(response.status === 200 && user!=''){
      const responseJSON = await response.json();
      responseJSON.map( (item) => {setList((e) => [...e, item.label]);} )}

    };
  

  useEffect(() => {
    fetchAPI();
  }, []);


  //MANEJO DE AGREGADO DE NUEVAS TAREAS
  const handleAdd = (event) => {
    if (event.key === "Enter") {
      setList([...list, event.target.value]);
      setCounter(counter + 1);
      updateTodoList(list);
      event.target.value="";
    } 
  };

  //GENERAR NUEVO USER

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
      .then(response => response.json())
      .then(result => console.log("Usuario creado ok"))
      .catch(error => console.log('error', error));

/*    const nombrefuncion = async () => {
      const response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, requestOptions)
      
      const responseJSON = await response.json();
      console.log(responseJSON);
      responseJSON.map((item) => setList((e) => [...e, item.label]))
    }
*/
  };

  //ACTUALIZAR LISTA DE TO-DOS
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
      .then(response => response.json())
      .then(data => console.log("Data updated", data))
      .catch(error => console.log('error', error));
  };

  
  //ELIMINAR USUARIO -OK
  const cleanAllTasks = () => {
    var raw = "";

    var requestOptions = {
      method: 'DELETE',
      body: raw,
      redirect: 'follow'
    };
    
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log("Usuario eliminado"))
      .catch(error => console.log('error', error));
    setList([]);
    setCounter(0);
    updateTodoList([]);
  };


  //RETURN
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
