import React, { useState } from 'react';
import './Home.css';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function Home() {
  const [command, setCommand] = useState('');
  const [results, setResults] = useState([]);

  const commandResponses = {
    'about me': 'I am Ajay Verma from India and currently residing in Dublin, Ireland. I have 4.8 years of experience in onboarding clients and providing technical support post-sales.',
    'my skills': 'My skills include Python, JavaScript, HTML, CSS, SQL, AWS.',
    'social -a': [
      { 'LinkedIn': 'https://www.linkedin.com/in/ajay-verma-1630/' },
      { 'GitHub': 'https://github.com/ajay-verma30' }
    ],
    'all -commands': 'about me, my skills, social -a',
    'clear': () => setResults([]),
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedCommand = command.trim().toLowerCase();
  
      if (trimmedCommand) {
        const response = commandResponses[trimmedCommand];
  
        if (response) {
          if (typeof response === 'function') {
            response();
          } else if (Array.isArray(response)) {
            const formattedResponse = response.map(item => {
              const [key, value] = Object.entries(item)[0];
              return `${key}: ${value}`;
            }).join(', ');
            setResults(prevResults => [...prevResults, formattedResponse]);
          } else {
            setResults(prevResults => [...prevResults, response]);
          }
        } else {
          setResults(prevResults => [...prevResults, `Sorry, I don't know what you mean`]);
        }
  
        setCommand('');
      }
    }
  };

  return (
    <div>
      <Container className='home-container'>
        <div style={{ padding: "10px" }} className='icon-container'>
          <FontAwesomeIcon icon={faCircle} className='icon icon-1' />
          <FontAwesomeIcon icon={faCircle} className='icon icon-2' />
          <FontAwesomeIcon icon={faCircle} className='icon icon-3' />
          <p className='header-text'>
            <a href='https://www.linkedin.com/in/ajay-verma-1630/' target='_blank' rel="noreferrer">
              <FontAwesomeIcon icon={faLinkedinIn} style={{ marginRight: "5px", fontSize: "15px", marginBottom: "-1px"}}  className="icon" />
              linkedin.com/ajay-verma
            </a>
          </p>
        </div>
        <hr className='horizontal-rule' />
        <div className='content'>
          <p>Portfolio version [1.0]</p>
          <p>Starting the server...</p>
          <p># I am Ajay Verma</p>
          <p># User located at:<span className='question' style={{marginLeft:"5px"}}>Dublin</span></p>
          <p>You can run the following commands:</p>
          <p className='question'>about me</p>
          <p className='subtext'>What I do and journey so far</p>
          <p className='question'>my skills</p>
          <p className='subtext'>Skills I possess</p>
          <p className='question'>social -a</p>
          <p className='subtext'>Social presence</p>
          <p><span className='pre-text-highlight'># user </span> in <span className='directory-highlight'> ~/ajay-verma</span></p>
          <div className='result-container'>

          {results.map((result, index) => {
  // Check if the result is for 'social -a'
  if (result.includes('LinkedIn')) {
    return (
      <table key={index} className='social-table'>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {commandResponses['social -a'].map((item, i) => {
            const [platform, link] = Object.entries(item)[0];
            return (
              <tr key={i}>
                <td>{platform}</td>
                <td><a href={link} target="_blank" rel="noreferrer">{link}</a></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else {
    return <p className='result-text' key={index}>{result}</p>;
  }
})}

    {/* {results.map((result, index) => (
      <p className='result-text' key={index}>{result}</p>
    ))} */}
  </div>
          <div className='input-container'>
            <p className='cursor'>&gt;</p>
            <input
              type="text"
              className='input-text'
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleEnterKey}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
