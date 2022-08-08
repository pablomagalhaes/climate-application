const convertKelvinToCelsius = (temp) => Math.floor(temp - 273.15);

export const filterCityData = (data, city) => {

  console.log('filterCityData data', data)

  const { temp, temp_min, temp_max, feels_like } = data;

  return {
    city,
    temp: convertKelvinToCelsius(temp),
    min: convertKelvinToCelsius(temp_min),
    max: convertKelvinToCelsius(temp_max),
    feels: convertKelvinToCelsius(feels_like)
  };
};

export const getObservationsData = (snapshot) => {
  return (!snapshot.val())
    ? []
    : Object.entries(snapshot.val())
        .map((observation, index) => {
          return {
            ...observation[1],
            key: index + 1
          };
        });
};
