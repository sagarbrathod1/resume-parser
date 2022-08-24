import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function App() {
  let [documents, setDocuments] = useState([]);
  let [keyword, setKeyword] = useState("");
  useEffect(function () {
    fetch("http://127.0.0.1:3001/documents?keyword=" + keyword)
      .then(response => response.json())
      .then((data) => setDocuments(data.documents));

  }, []);

  function handleChange(event) {
    setKeyword(event.target.value);

    fetch("http://127.0.0.1:3001/documents?keyword=" + keyword)
      .then(response => response.json())
      .then((data) => setDocuments(data.documents));
  }
  
  return (
    <div className="App">
      <input className="h-24 w-full text-3xl"placeholder="keyword" onChange={handleChange} />
      <header className="App-header m-10">
       <ul>{documents.length >= 1 ? documents.map((document, index)=> <li className={index % 2 === 0 ? "bg-gray-100 text-black" : ""}>{document}</li>) : "" }
        </ul>
      </header>
    </div>
  );
}

export default App;
