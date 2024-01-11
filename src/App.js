import './App.css';
import { useEffect, useState } from 'react'; 

function App() {
  const[isCompletedScreen,setIsCompleteScreen]=useState(false);//for colur of the button
  const[allTodos,setallTodos]=useState([]);//for seting state of task
  const[newTodoTitle,setNewTodoTitle]=useState("");//for title
  const[newDescription,setNewDescription]=useState("");//for description
  const[completedTodos,setCompletedTodos]=useState([]);

  const HandleAddTodo=()=>{//function to handle add button things
    let newTodoItem={//object
      title: newTodoTitle,
      description: newDescription
    }
    let updatedTodoArr=[...allTodos];//copy of existing todo arr, basically jisse purana wala task na hate
    updatedTodoArr.push(newTodoItem);
    setallTodos(updatedTodoArr);
    localStorage.setItem ('todolist', JSON.stringify (updatedTodoArr));
    setNewDescription('');
    setNewTodoTitle('');
  }

  const handeldeleteTodo=(index)=>{
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index,1);//1 as we want to delete only one item at a time
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setallTodos(reducedTodo);
  }

  const handelComplete=(index)=>{
    let now=new Date();
    let dd=now.getDate();
    let mm=now.getMonth()+1;
    let yyyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let ccompletedOn=dd+'-'+mm+'-'+yyyy+' at '+h+':'+m+':'+s;

    let filteredItem={ //gets the item which completed gets triggered
      ...allTodos[index],
      completedOn:ccompletedOn
    }

    let updatedCompltedTodos=[...completedTodos];//not on all todos as some of them are not completed
    updatedCompltedTodos.push(filteredItem);
    setCompletedTodos(updatedCompltedTodos);
    handeldeleteTodo(index);//remove items which are completed from todo
    localStorage.setItem ('completedTodos', JSON.stringify (updatedCompltedTodos));
  }

  const handeldeleteCompletedTodo=(index)=>{
    let reducedTodo=[...completedTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }

  useEffect(()=>{
    let saveTodo=JSON.parse(localStorage.getItem('todolist'));
    let savecompletedTodo=JSON.parse(localStorage.getItem('completedTodos'));
    if(saveTodo){//checking as if local storage is empt it should not append null
      setallTodos(saveTodo);
    }
    if(savecompletedTodo){//checking as if local storage is empt it should not append null
      setCompletedTodos(savecompletedTodo);
    }
  },[]);

  return (
    <div className="App">
      <h1>My ToDos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTodoTitle} onChange={(e)=>setNewTodoTitle(e.target.value)} placeholder="what is the Todo Title?"/>
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="what all need to do?"/>
          </div>
          <div className="todo-input-item">
            <button className='primaryBtn' type="button" onClick={HandleAddTodo} >Add</button>
          </div>
        </div>
        <div className='btn-area'>
          <button className={`seconBtn ${isCompletedScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Todo</button>
          <button className={`seconBtn ${isCompletedScreen===true && 'active'}`}onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className='todo-list'>
          {/* //for all todo task tab */}
          {isCompletedScreen===false && allTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className='delncheck'>
                  <button className='delbtn' onClick={()=>handeldeleteTodo(index)}>Del</button>
                  <button className='checkbtn' onClick={()=>handelComplete(index)}>Done</button>
                </div>
              </div>
            )
          })}
          
          {isCompletedScreen===true && completedTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><small><i>Completed at: {item.completedOn}</i></small></p>
                <div className='delncheck'>
                  <button className='delbtn' onClick={()=>handeldeleteCompletedTodo(index)}>Del</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
