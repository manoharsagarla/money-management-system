import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("");
  const [transactions, setTransactions] = useState([]);
const [amount, setAmount] = useState("");
const [desc, setDesc] = useState("");
  // 🔥 Fetch transactions
  useEffect(() => {
  fetch("https://money-management-system-fxiv.onrender.com/transactions")
    .then(res => res.text())
    .then(text => {
      try {
        const data = JSON.parse(text);
        setTransactions(data);
      } catch {
        console.log("Not JSON:", text);
      }
    });
}, []);
  // 🔥 Backend Login
  const login = async () => {
    const res = await fetch("https://money-management-system-fxiv.onrender.com/login", {
      method: "POST"
    });

    const text = await res.text();

try {
  const data = JSON.parse(text);
  alert(data.message);
} catch {
  alert(text);
}
    setLoggedIn(true);
  };

  // 🔐 LOGIN PAGE
  if (!loggedIn) {
    return (
      <div style={{
        height: "100vh",
        background: "linear-gradient(to right,#4facfe,#00f2fe)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily:"Arial"
      }}>
        <div style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          width: "320px",
          textAlign: "center",
          boxShadow:"0 4px 15px rgba(0,0,0,0.2)"
        }}>
          <h1>Money Manager</h1>

          <input placeholder="Email" style={{margin:"8px", padding:"10px", width:"90%"}}/><br/>
          <input type="password" placeholder="Password" style={{margin:"8px", padding:"10px", width:"90%"}}/><br/>

          <button onClick={login} style={{
            padding:"10px 20px",
            background:"#4facfe",
            color:"white",
            border:"none",
            borderRadius:"6px",
            cursor:"pointer"
          }}>
            Login
          </button>
        </div>
      </div>
    );
  }

  // 📊 Dashboard
  return (
    <div style={{
      minHeight:"100vh",
      background:"#f5f7fa",
      padding:"30px",
      fontFamily:"Arial"
    }}>

      <h1 style={{textAlign:"center"}}>Dashboard</h1>

      {/* Balance */}
      <div style={{
        background:"linear-gradient(to right,#36d1dc,#5b86e5)",
        color:"white",
        width:"300px",
        margin:"20px auto",
        padding:"20px",
        borderRadius:"12px",
        textAlign:"center",
        boxShadow:"0 4px 15px rgba(0,0,0,0.2)"
      }}>
        <h3>Total Balance</h3>
        <h1>₹5000</h1>
      </div>

      {/* Buttons */}
      <div style={{textAlign:"center"}}>
        <button onClick={()=>{
          setShowForm(true);
          setType("Income");
        }} style={{background:"#28a745",color:"white",margin:"10px",padding:"10px"}}>
          + Add Income
        </button>

        <button onClick={()=>{
          setShowForm(true);
          setType("Expense");
        }} style={{background:"#dc3545",color:"white",margin:"10px",padding:"10px"}}>
          - Add Expense
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{
          background:"white",
          width:"300px",
          margin:"20px auto",
          padding:"20px",
          borderRadius:"10px"
        }}>
          <h3>Add {type}</h3>

         <input 
  placeholder="Amount" 
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  style={{width:"90%",padding:"10px",margin:"5px"}}
/>

<input 
  placeholder="Description" 
  value={desc}
  onChange={(e) => setDesc(e.target.value)}
  style={{width:"90%",padding:"10px",margin:"5px"}}
/>
          <button onClick={async () => {
            await fetch("https://money-management-system-fxiv.onrender.com/add", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                type: type,
                amount: Number(amount),
description: desc
              })
            });

            alert("Saved");
            window.location.reload();
          }} style={{padding:"8px 15px"}}>
            Save
          </button>
        </div>
      )}

      {/* Transactions */}
      <div style={{
        background:"white",
        width:"300px",
        margin:"20px auto",
        padding:"20px",
        borderRadius:"10px"
      }}>
        <h3>Recent Transactions</h3>

        <ul style={{listStyle:"none", padding:"0"}}>
          {transactions.map((t, index) => (
            <li key={index} style={{color: t.type === "Income" ? "green" : "red"}}>
              {t.type === "Income" ? "+" : "-"} ₹{t.amount} ({t.description})
            </li>
          ))}
        </ul>

      </div>

      {/* Chart */}
      <div style={{
        background:"white",
        width:"320px",
        margin:"20px auto",
        padding:"20px",
        borderRadius:"10px"
      }}>
        <h3 style={{textAlign:"center"}}>Expense Overview</h3>

        <Pie data={{
          labels: ["Food", "Travel", "Shopping"],
          datasets: [{
            data: [200,150,300],
            backgroundColor: ["#ff6384","#36a2eb","#ffcd56"]
          }]
        }} />

      </div>

    </div>
  );
}

export default App;