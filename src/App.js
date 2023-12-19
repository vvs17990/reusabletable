import logo from './logo.svg';
import './App.css';
import Table from './component/table';
import { tableData } from './data';

function App() {
  const columns = [
    { field:"id", header:"ID"},
    { field:"name",header:"Employee"},
    { field:"address", header:"adress"},
    { field:"date",header:"Date"},
    { field:"order", header:"EID"}
  ];//this part shows reusability component
  const columns1=[
    {field:"CustomerName", header:"Name"},
    {field:"Email", header:"email"}
  ];

  const demoData=[{CustomerName:"vishal", Email:"demo@gamil.com"}]
  return (
    <div className="App">
      <h2>React-App</h2>
      <h4>Building a basic reusable table using react</h4>
      <Table data ={tableData} columns={columns}/>     
    
      <h3>Verification</h3>  
      <Table columns={columns1} data={demoData}/>
    </div>
  );
}

export default App;
