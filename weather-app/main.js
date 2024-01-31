import './style.css';
import { getWeather } from '../weather';
import { renderCurrentWeather, renderDailyWeather, renderHourlyWeather } from '../render';

navigator.geolocation.getCurrentPosition(positionSuccess, positionError)

function positionSuccess({ coords }) {
    getWeather(
        coords.latitude,
        coords.longitude,
        Intl.DateTimeFormat().resolvedOptions().timeZone
        ).then(renderWeather).catch(e => {
                console.error(e)
                alert('Error getting weather')
            })
}
function positionError() {
    alert('Error while getting location. Allow us to use your location and refresh the page')
}





function renderWeather({ current, daily, hourly}) {
    renderCurrentWeather(current)
    renderDailyWeather(daily)
    renderHourlyWeather(hourly)
    document.body.classList.remove('blurred')
}