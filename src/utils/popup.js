/*TODO
- Improve units handling.
- Convert Popup on React Component?
 */
export default function popupCreator(weatherData, unit) {
    if (!weatherData) return null;

    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const pressure = weatherData.main.pressure;
    const tempUnit = unit==='imperial'?'℉':'℃';

    const html = `
     <div>
      <strong className='mr3'>Temp:</strong>
      <span className='color-gray-light'>${temp}${tempUnit}</span>
     </div>
     <div>
      <strong className='mr3'>Humidity:</strong>
      <span className='color-gray-light'>${humidity}%</span>
     </div>
     <div>
      <strong className='mr3'>Pressure:</strong>
      <span className='color-gray-light'>${pressure}hPa</span>
     </div>
  `;
    return html;
}