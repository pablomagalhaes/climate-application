const Info = ({ observation }) => {
  console.log('observation', observation);
  const { city, temp, min, max, feels, sys, description } = observation;


  function capitalizeString(string) {
    console.log('string', string);
    return string[0].toUpperCase() + string.slice(1)
  }

  return (
    <>
      <div className="result">
        <h1 className="temperature">
          {temp.toFixed(0)}<span>ºC</span>
        </h1>

        <span className="description">{capitalizeString(description)}</span>

        <span className="local">
          {`${city}, ${sys.country}`}&nbsp;&nbsp;
          {sys.country !== '-' && <img src={`https://raw.githubusercontent.com/hjnilsson/country-flags/master/png100px/${sys.country.toLowerCase()}.png`} alt="country"/>}
        </span>
      </div>

      <div className="other-results">
        <div className="other">
          Sensação térmica: <br/>
           <span>{feels} ºC</span>
        </div>
        <div className="other">
          Temp. Mínima: <br/>
          <span>{min} ºC</span>
        </div>
        <div className="other">
          Temp. Máxima: <br/>
          <span>{max} ºC</span>
        </div>
      </div>
    </>
  );
};

export default Info;
