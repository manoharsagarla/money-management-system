import { useState } from "react";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
function App() {
  const data = {
  labels: ["Food", "Travel", "Shopping"],
  datasets: [
    {
      data: [200, 150, 300],
      backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"]
    }
  ]
};

  const [loggedIn, setLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("");

  if(!loggedIn){
    return (
      <div style={{
        height:"100vh",
        background:"linear-gradient(to right,#4facfe,#00f2fe)",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}>

        <div style={{
          background:"white",
          padding:"40px",
          borderRadius:"10px",
          width:"320px",
          textAlign:"center",
          boxShadow:"0 4px 10px rgba(0,0,0,0.2)"
        }}>

          <h1>Money Manager</h1>
          <h3>User Login</h3>

          <input placeholder="Enter Name" style={{width:"90%",padding:"10px",margin:"8px"}}/>
          <input placeholder="Enter Email" style={{width:"90%",padding:"10px",margin:"8px"}}/>
          <input placeholder="Mobile Number" style={{width:"90%",padding:"10px",margin:"8px"}}/>
          <input type="password" placeholder="Password" style={{width:"90%",padding:"10px",margin:"8px"}}/>

          <button
            onClick={()=>setLoggedIn(true)}
            style={{background:"#4facfe",color:"white",padding:"10px 20px",border:"none",borderRadius:"5px"}}
          >
            Login
          </button>

        </div>
      </div>
    )
  }

  return (
    <div style={{textAlign:"center", padding:"40px"}}>

      <h1>Dashboard</h1>

    <div style={{
  background:"white",
  width:"320px",
  margin:"20px auto",
  padding:"20px",
  borderRadius:"10px",
  boxShadow:"0 4px 10px rgba(0,0,0,0.2)"
}}>

  <h3>Total Balance</h3>

  <h1 style={{color:"green"}}>₹5000</h1>

</div>

      <button
        onClick={()=>{
          setShowForm(true);
          setType("Income");
        }}
        style={{background:"green",color:"white",padding:"10px",margin:"10px"}}
      >
        Add Income
      </button>

      <button
        onClick={()=>{
          setShowForm(true);
          setType("Expense");
        }}
        style={{background:"red",color:"white",padding:"10px",margin:"10px"}}
      >
        Add Expense
      </button>

      {showForm && (
        <div style={{marginTop:"20px"}}>

          <h3>Add {type}</h3>

          <input placeholder="Amount" style={{padding:"8px",margin:"5px"}}/>
          <input placeholder="Description" style={{padding:"8px",margin:"5px"}}/>

          <br/>

          <button
            onClick={()=>alert(type+" added")}
            style={{background:"#4facfe",color:"white",padding:"8px 15px",margin:"10px"}}
          >
            Save
          </button>

        </div>
      )}

      <h3>Recent Transactions</h3>

<ul style={{listStyle:"none"}}>
  <li>Salary + ₹5000</li>
  <li>Food - ₹200</li>
  <li>Travel - ₹150</li>
</ul>

<h3>Expense Overview</h3>

<div style={{width:"300px", margin:"auto"}}>
  <Pie data={data} />
</div>

</div>
);
}

export default App;