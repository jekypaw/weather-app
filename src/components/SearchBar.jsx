import { useState } from 'react'

function SearchBar({ onCari, loading, theme }) {

  const [kota, setKota] = useState('')
  const [error, setError] = useState('')

  function handleCari() {
    if (kota.trim() === '') {
      setError('Masukkan nama kota dulu!')
      return
    }
    setError('')
    onCari(kota.trim())
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') handleCari()
  }

  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Cari kota... contoh: Semarang"
          value={kota}
          onChange={(e) => setKota(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            flex: 1,
            padding: '13px 16px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.15)',
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <button
          onClick={handleCari}
          disabled={loading}
          style={{
            padding: '13px 24px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: loading ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)',
            color: loading ? 'rgba(255,255,255,0.3)' : '#0a0a0f',
            fontSize: '14px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {loading ? 'Mencari...' : 'Cari'}
        </button>
      </div>
      {error && (
        <p style={{ color: '#fca5a5', fontSize: '13px', marginTop: '8px' }}>
          ⚠️ {error}
        </p>
      )}
    </div>
  )
}

export default SearchBar