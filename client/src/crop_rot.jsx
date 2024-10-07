import React, { useState } from 'react';

function CropRot() {
  const [numPlots, setNumPlots] = useState(null);
  const [numPeriods, setNumPeriods] = useState(null);
  const [season, setSeason] = useState(null);
  const [soilTexture, setSoilTexture] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setImageSrc(null);
    setError(null);

    try {
      const response = await fetch('http://localhost:7000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          num_plots: numPlots,
          num_periods: numPeriods,
          season: season,
          soil_texture: soilTexture,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ height:'40vh',marginBottom: '20px', backgroundColor: 'lightgrey'}}>
        <label style={{
          width: '100%',
          padding: '10px',
          display: 'block',
        }}>
          Number of Plots:
          <input
            type="number"
            value={numPlots}
            placeholder='Plots'
            onChange={(e) => setNumPlots(Number(e.target.value))}
            style={{marginLeft:'30px'}}
          />
        </label>
        <br />
        <label style={{
          width: '100%',
          padding: '10px',
          display: 'block',
        }}>
          Number of Periods:
          <input
            type="number"
            value={numPeriods}
            placeholder='Periods'
            onChange={(e) => setNumPeriods(Number(e.target.value))}
            style={{marginLeft:'12px'}}
          />
        </label>
        <br />
        <label style={{
          width: '100%',
          padding: '10px',
          display: 'block',
        }}>
          Season:
          <input
            type="text"
            value={season}
            placeholder='Rabi/Kharif'
            onChange={(e) => setSeason(e.target.value)}
            style={{marginLeft:'95px'}}
          />
        </label>
        <br />
        <label style={{
          width: '100%',
          padding: '10px',
          display: 'block',
        }}>
          Soil Texture:
          <input
            type="text"
            value={soilTexture}
            placeholder='Soil Texture'
            onChange={(e) => setSoilTexture(e.target.value)}
            style={{marginLeft:'65px'}}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          style={{
            fontSize:'15px',
            color:'ButtonText',
            height:'50px',
            width: '200px',
            marginTop:'-200px',
            marginLeft:'700px',
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'red';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'blue';
          }}
        >
          {loading ? 'Generating...' : 'Generate Crop Rotation'}
        </button>
      </form>

      {error ? (
        <p>Error: {error}</p>
      ) : imageSrc ? (
        <img src={imageSrc} alt="Crop Rotation Chart" style={{height:'150vh',width:'80vw', display: 'flex', alignItems: 'center',marginTop:'50px', justifyContent: 'center'}} />
      ) : (
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: 'gray' }}>
          Loading...
        </p>
      )}
    </div>
  );
}

export default CropRot;
