import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'

const API_KEY = import.meta.env.VITE_API_KEY

function getTheme(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return {
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #4a0080 100%)',
    accent: '#c084fc',
    label: 'Badai Petir ⛈️'
  }
  if (weatherId >= 300 && weatherId < 600) return {
    gradient: 'linear-gradient(135deg, #0c1445 0%, #1a4080 100%)',
    accent: '#60a5fa',
    label: 'Hujan 🌧️'
  }
  if (weatherId >= 600 && weatherId < 700) return {
    gradient: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
    accent: '#0284c7',
    label: 'Salju ❄️'
  }
  if (weatherId >= 700 && weatherId < 800) return {
    gradient: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
    accent: '#e2e8f0',
    label: 'Berkabut 🌫️'
  }
  if (weatherId === 800) return {
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
    accent: '#fff7ed',
    label: 'Cerah ☀️'
  }
  if (weatherId > 800) return {
    gradient: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
    accent: '#e2e8f0',
    label: 'Berawan ⛅'
  }
  return {
    gradient: 'linear-gradient(135deg, #0a0a0f 0%, #1e1e2e 100%)',
    accent: '#a78bfa',
    label: 'Cuaca'
  }
}

function App() {

  const [cuaca, setCuaca] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [kotaTerakhir, setKotaTerakhir] = useState(
    localStorage.getItem('kotaTerakhir') || ''
  )

  const theme = cuaca ? getTheme(cuaca.weather[0].id) : {
    gradient: 'linear-gradient(135deg, #0a0a0f 0%, #1e1e2e 100%)',
    accent: '#a78bfa'
  }

  useEffect(() => {
    if (kotaTerakhir !== '') {
      cariCuaca(kotaTerakhir)
    }
  }, [])

  async function cariCuaca(kota) {
    setLoading(true)
    setError('')
    setCuaca(null)

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${API_KEY}&units=metric&lang=id`
      )
      if (!response.ok) throw new Error('Kota tidak ditemukan!')
      const data = await response.json()
      setCuaca(data)
      setKotaTerakhir(kota)
      localStorage.setItem('kotaTerakhir', kota)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.gradient,
      transition: 'background 0.8s ease',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>

        <div style={{ marginBottom: '28px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'rgba(255,255,255,0.95)',
            marginBottom: '4px'
          }}>
            Weather App 🌤️
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
            Cek cuaca real-time di dunia
          </p>
        </div>

        <SearchBar onCari={cariCuaca} loading={loading} theme={theme} />

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.5)' }}>
            <p style={{ fontSize: '32px', marginBottom: '8px' }}>⏳</p>
            <p>Sedang mengambil info cuaca...</p>
          </div>
        )}

        {error && (
          <div style={{
            backgroundColor: 'rgba(248,113,113,0.15)',
            border: '1px solid rgba(248,113,113,0.3)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <p style={{ fontSize: '32px', marginBottom: '8px' }}>😕</p>
            <p style={{ color: '#f87171', fontSize: '14px' }}>⚠️ {error}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '6px' }}>
              Pastikan ejaan nama kotanya benar ya!
            </p>
          </div>
        )}

        {cuaca && !loading && (
          <WeatherCard data={cuaca} theme={theme} />
        )}

        {!cuaca && !loading && !error && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.3)' }}>
            <p style={{ fontSize: '48px', marginBottom: '12px' }}>🌍</p>
            <p style={{ fontSize: '15px' }}>Cari nama kota!</p>
            <p style={{ fontSize: '13px', marginTop: '8px', color: 'rgba(255,255,255,0.2)' }}>
              Contoh: Semarang, Jambi, Tokyo, Palembang
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default App