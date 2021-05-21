import React, { useEffect, useState } from 'react';
import './App.css';
import CovidSwiat from './components/CovidSwiat';
import Graf from './components/Graf';
import axios from './axios';

function App() {

  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const[loading, setLoading] = useState(false);
  const[covidSwiat, setCovidSwiat] = useState({});
  const[days, setDays] = useState(7);
  const[country, setCountry] = useState('');
  const[coronaCount, setCoronaCount] = useState([]);
  const[label, setLabel] = useState([]);


  useEffect(() => {

    setLoading(true);
    axios.get(`/summary`)
    .then(res => {
      setLoading(false);

      if(res.status === 200){
        setTotalConfirmed(res.data.Global.TotalConfirmed);
        setTotalRecovered(res.data.Global.NewRecovered);
        setTotalDeaths(res.data.Global.NewDeaths);
        setCovidSwiat(res.data);
      }
      console.log(res);
    })
    .catch(error => {
      console.log(error)
    })

  }, []);

  const formatDaty = (date) =>{
    const d = new Date(date);
    const yaer = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const _date = d.getDate();
    return `${yaer}-${month}-${_date}`;
  }

  const countryHandler = (e) => {
    setCountry(e.target.value);
    const d = new Date();
    const to = formatDaty(d);
    const from = formatDaty(d.setDate(d.getDate() - days + 1));
   getCoronaDate(e.target.value, from, to)
  }

  const daysHandler = (e) => {
    setDays(e.target.value);
    const d = new Date();
    const to = formatDaty(d);
    const from = formatDaty(d.setDate(d.getDate() - e.target.value));
    getCoronaDate(country, from, to)

  }

  const getCoronaDate = (countrySlug, from , to) => {
    axios.get(`/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
    .then(res => {
      console.log(res);

      const yAxisCoronaCount = res.data.map(d => d.Cases);
      const xAxisLabel = res.data.map(d => d.Date);
      const covidDetails = covidSwiat.Countries.find(country => country.Slug === countrySlug);
      
      setCoronaCount(yAxisCoronaCount);
      setTotalConfirmed(covidDetails.TotalConfirmed);
      setTotalRecovered(covidDetails.TotalRecovered);
      setTotalDeaths(covidDetails.TotalDeaths);
      setLabel(xAxisLabel);
      
    })
    .catch(error => {
      console.log(error);
    })
  }

  if(loading){
    return <p>Loading...!</p>

  }
  return (
    <div className="App">
      <CovidSwiat 
        totalConfirmed={totalConfirmed}
        totalRecovered={totalRecovered}
        totalDeaths={totalDeaths}
        country={country}
      />

      <div>
        <select value={country} onChange={countryHandler}>
          <option value="">Wybierz państwo</option>
        {
          covidSwiat.Countries && covidSwiat.Countries.map(country => 
            <option key={country.Slug} value={country.Slug}>{country.Country}</option>
            )
        }
        </select>
        <select value={days} onChange={daysHandler}>
          <option value="7">Ostatnie 7 dni</option>
          <option value="30">Ostatnie 30 dni</option>
          <option value="90">Ostatnie 90 dni</option>
        </select>
      </div>
      <Graf
        yAxis={coronaCount}
        label={label}
      />
    </div>
  );
}

export default App;
