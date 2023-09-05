import './App.css';
import React from 'react';
import Collapsible from 'react-collapsible';
import axios from 'axios';


function App() {


  return (
    <div className="App">
      <header className="App-header">
        <h1>Message Board</h1>
        <h2>Start a new thread</h2>

        <form action="https://example.com">
          <textarea className='Thread-title-form' placeholder='Enter thread title' />
          <button type="submit">Submit</button>
        </form>

        <div>
          <h2>Most Recent Threads</h2>

          <Collapsible trigger={<button >Click to show or hide</button>}>
            <ol id="recentThreads">
              <li className='Recent-thread'><a href='https://example.com'>Thread #1</a></li>
              <li className='Recent-thread'><a href='https://example.com'>Thread #2</a></li>
              <li className='Recent-thread'><a href='https://example.com'>Thread #3</a></li>
              <li className='Recent-thread'><a href='https://example.com'>Thread #4</a></li>
              <li className='Recent-thread'><a href='https://example.com'>Thread #5</a></li>
              <li className='Recent-thread'><a href='https://example.com'>Thread #6</a></li>
            </ol>
          </Collapsible>
        </div>
      </header>
    </div>
  );
}

export default App;
