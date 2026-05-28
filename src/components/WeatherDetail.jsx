function WeatherDetail({ icon, label, value }) {
  return (
    <div style={{
      backgroundColor: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '16px',
      textAlign: 'center',
      border: '1px solid rgba(255,255,255,0.15)',
      flex: 1
    }}>
      <p style={{ fontSize: '24px', marginBottom: '6px' }}>{icon}</p>
      <p style={{
        fontSize: '11px',
        color: 'rgba(255,255,255,0.5)',
        marginBottom: '4px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        {label}
      </p>
      <p style={{ fontSize: '15px', fontWeight: '600', color: 'rgba(255,255,255,0.9)' }}>
        {value}
      </p>
    </div>
  )
}

export default WeatherDetail