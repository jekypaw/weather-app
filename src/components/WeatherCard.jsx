import WeatherDetail from './WeatherDetail'

function WeatherCard({ data, theme }) {

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  const deskripsi = data.weather[0].description
  const suhu = Math.round(data.main.temp)
  const rasanya = Math.round(data.main.feels_like)
  const kelembaban = data.main.humidity
  const angin = (data.wind.speed * 3.6).toFixed(1)
  const visibilitas = (data.visibility / 1000).toFixed(1)

  return (
    <div style={{
      backgroundColor: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.2)',
      borderRadius: '20px',
      padding: '32px',
      marginBottom: '16px'
    }}>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px'
      }}>
        <div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: 'rgba(255,255,255,0.95)',
            marginBottom: '4px'
          }}>
            {data.name}, {data.sys.country}
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            textTransform: 'capitalize'
          }}>
            {deskripsi}
          </p>
        </div>
        <img
          src={iconUrl}
          alt={deskripsi}
          style={{ width: '80px', height: '80px', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' }}
        />
      </div>

      <div style={{ marginBottom: '24px' }}>
        <p style={{
          fontSize: '72px',
          fontWeight: '700',
          color: 'rgba(255,255,255,0.95)',
          lineHeight: 1
        }}>
          {suhu}°C
        </p>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>
          Terasa seperti {rasanya}°C
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <WeatherDetail icon="💧" label="Kelembaban" value={`${kelembaban}%`} />
        <WeatherDetail icon="💨" label="Angin" value={`${angin} km/h`} />
        <WeatherDetail icon="👁️" label="Visibilitas" value={`${visibilitas} km`} />
      </div>

    </div>
  )
}

export default WeatherCard