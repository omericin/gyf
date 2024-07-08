import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import load from './pacman.svg'; // Tell webpack this JS file uses this image
import logout from './logout.svg'; // Tell webpack this JS file uses this image

function App() {
  const resetData = {
        "okan": {
            "id": 1,
            "limit": 18,
            "remaining": 18,
            "user": "okan",
            "name": "Okan",
            "password": "geyozi"
        },
        "oguzhan": {
            "id": 2,
            "limit": 8,
            "user": "oguzhan",
            "remaining": 8,
            "name": "Oğuzhan",
            "password": "okangey"
        },
        "omer": {
            "id": 3,
            "limit": 1,
            "user": "omer",
            "remaining": 1,
            "name": "Ömer",
            "password": "hepsigey",
            "sportLimit": 3,
            "remainingSportLimit": 3,
            "resetTime": Date.now()
        },
        "efe": {
            "id": 4,
            "limit": 18,
            "remaining": 18,
            "user": "efe",
            "name": "Efe",
            "password": "bengeyim",
            "disable": true
        }
    };

  const Card = (data) => {
    return (
      <div className="cardx">
        <div className='text'>
          {data?.name}:&nbsp;&nbsp;
        </div>
        <div className='text'>
          {data?.remaining < 0 && <div>&nbsp;Limit aşımı!</div>}
          {data?.remaining >= 0 && <div>{data?.remaining}&nbsp;/&nbsp;</div>}
        </div>
        <div className='text'>
          { data?.remaining >= 0 && data?.limit}
        </div>
      </div>
    );
  };

  const [response, setResponse] = useState();
  const [req, setReq] = useState();
  const localName = localStorage.getItem('name');
  const [self, setSelf] = useState(localName);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setReq(null);
    setLoading(true);
      axios.get(`https://api.jsonbin.io/v3/b/668b0ffbad19ca34f8845079`, {
        headers: {
          "X-Master-Key": "$2a$10$Wpu95i5igWe6O9J/0DhqPe8tyqxrLlZBqIT.oze/hPCNspAIKMPiO"
        }
      }).then((res) => {
      setLoading(false);
      setResponse(res.data.record.data);
      }).catch((err) => {
      setLoading(false);
      console.log('err', err);
      })
  }, []);

  useEffect(() => {
    if (Date.now() - 86400000 > response?.omer?.resetTime) {
      setLoading(true);
          axios.put(`https://api.jsonbin.io/v3/b/668b0ffbad19ca34f8845079`, {"data": resetData}, {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": "$2a$10$Wpu95i5igWe6O9J/0DhqPe8tyqxrLlZBqIT.oze/hPCNspAIKMPiO"
      }
    }).then(() => {
      setLoading(true);
      axios.get(`https://api.jsonbin.io/v3/b/668b0ffbad19ca34f8845079`, {
        headers: {
          "X-Master-Key": "$2a$10$Wpu95i5igWe6O9J/0DhqPe8tyqxrLlZBqIT.oze/hPCNspAIKMPiO"
        }
      }).then((res) => {
      setLoading(false);
        setResponse(res.data.record.data);
      }).catch((err) => {
      setLoading(false);
      console.log('err', err);
      })
    })
    }
}, [response]);

  function update() {
    setLoading(true);
    axios.put(`https://api.jsonbin.io/v3/b/668b0ffbad19ca34f8845079`, {"data": req}, {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": "$2a$10$Wpu95i5igWe6O9J/0DhqPe8tyqxrLlZBqIT.oze/hPCNspAIKMPiO"
      }
    }).then(() => {
      setLoading(true);
      axios.get(`https://api.jsonbin.io/v3/b/668b0ffbad19ca34f8845079`, {
        headers: {
          "X-Master-Key": "$2a$10$Wpu95i5igWe6O9J/0DhqPe8tyqxrLlZBqIT.oze/hPCNspAIKMPiO"
        }
      }).then((res) => {
      setLoading(false);
        setResponse(res.data.record.data);
      }).catch((err) => {
        console.log('err', err);
      })
    })
  };
    function handleSubmit(e) {
      // Prevent the browser from reloading the page
      e.preventDefault();
  
      // Read the form data
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());

      Object.values(response).map((item, index) => {
        if (item.user == formJson.name && item.password == formJson.pass) {
          localStorage.setItem('name', item.user);
          setSelf(item.user);
        }
      })

    }
    useEffect(() => {
      if(req) {
        update();
      }
    }, [req]);

    function handleUpdate() {
      if (self == 'okan') {
        setReq({...response, okan: {...response.okan, remaining: response.okan.remaining-1}});
      };
      if (self == 'oguzhan') {
        setReq({...response, oguzhan: {...response.oguzhan, remaining: response.oguzhan.remaining-1}});
      };
      if (self == 'omer') {
        setReq({...response, omer: {...response.omer, remaining: response.omer.remaining-1}});
      };
      if (self == 'efe') {
        setReq({...response, efe: {...response.efe, remaining: response.efe.remaining-1}});
      };
    };
  
  if (loading) {return(<div style={{ display: 'flex', width: '100%', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
    <img src={load} alt="load" /></div>
  );}
  if (self) {
    return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
        <div style={{marginBottom: 30}}><button className="button2" role="button" onClick={() => {handleUpdate()}}>Ben ibneyim çünkü bu butona basçam.</button></div>
      {Card(response?.okan)}
      {Card(response?.omer)}
      {Card(response?.oguzhan)}
      {Card(response?.efe)}
        <button  className="button" style={{display: 'flex',width: 200, height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 100}} onClick={() => {localStorage.removeItem('name');}}>Çıkış</button>
    </div>
  );}
  else {
    return (<div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <form method="post" onSubmit={handleSubmit}>
      <div className="brutalist-container">
  <input
    className="brutalist-input smooth-type"
    type="text"
    name="name"
  />
  <label className="brutalist-label">Kullanıcı Adı</label>
</div>
<div style={{marginTop: 50}} className="brutalist-container">
  <input
    className="brutalist-input smooth-type"
    type="password"
    name="pass"
  />
  <label className="brutalist-label">Şifre</label>
</div>
        <div style={{width: 100, marginTop: 50}}><button className="button" role="button" type='submit'>Giriş</button></div>
      </form></div>
    );
}
}

export default App;
