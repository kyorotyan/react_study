import React,{ useState} from 'react';
import './App.css';

type Record = {
  title: string;
  id: number;
  body: string;
};

function App() {
  const [records, setRecords] = useState<Record[]>([]);

  const fetchPost = () => {
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
          id: records.length,
          title: json!.title,
          body: json!.body
        };
    
        setRecords([newRecod, ...records]);
      });
  };



  return (
    <div className="App">
     <div>
       <h2>Koki Blog</h2>
          <button onClick={() => fetchPost()}>Get Post</button>
       <ul className='recordList'>
         {records.map((record) => (
            <div className='record' key={record.id}>
              <h3>{record.title}</h3>
              <hr></hr>
              <p>{record.body}</p>
            </div>
         ))}
       </ul>
     </div>
    </div>
  );
}

export default App;
