import React,{ useState} from 'react';
import './App.css';

function App() {
  const [inputvalue, setInputValue] = useState("");
  const [records, setRecords] = useState<Record[]>([]);


  type Record = {
    title: string;
    id: number;
    checked: boolean;
    inputvalue: string;
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newRecod: Record = {
      inputvalue: inputvalue,
      id: records.length,
      checked: false,
      title: ""
    }

    setRecords([newRecod, ...records]);
    setInputValue("");
  };

    const handleEdit = (id:number, inputvalue: string) => {
      const newRecod = records.map((record) => {
        if(record.id === id){
          record.inputvalue = inputvalue;
        }
        return record;
      })

      setRecords(newRecod);
    };

    const handleChecked = (id: number, checked: boolean) => {
      const newRecod = records.map((record) => {
        if(record.id === id){
          record.checked = !checked;
        }
        return record;
    });

    setRecords(newRecod);
  };


  const printHelloWorld = () => {
    const fetchRecordUrl = 'https://jsonplaceholder.typicode.com/posts/' + (records.length + 1);
    fetch(fetchRecordUrl, {
      method: 'GET',
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.resolve(response.json());
        }
        return Promise.reject();
      })
      .then((json) => {
        const newRecod: Record = {
          inputvalue: json!.title,
          id: records.length,
          checked: json!.completed,
          title: json!.title,

        }
    
        setRecords([newRecod, ...records]);
      });
  };



  return (
    <div className="App">
     <div>
       <h2>Koki Blog</h2>
       <form onSubmit={(e) => handleSubmit(e)}>
       </form>
       <button onClick={() => printHelloWorld()}>Get Post</button>
       <ul className='recordList'>
         {records.map((record) => (
          <li key={record.id}>
            <input  type='text'  onChange={(e) => handleEdit(record.id, e.target.value)} className="inputText" value={record.inputvalue} disabled={record.checked}/>
            <input type='checkbox'  checked={record.checked} onChange={() => handleChecked(record.id, record.checked)}/>
          </li>
         ))}
       </ul>
     </div>
    </div>
  );
}

export default App;
