import './style.css';
import { getWeather } from '../weather';
import { renderCurrentWeather, renderDailyWeather } from '../render';

getWeather(53.4809, -2.2374, Intl.DateTimeFormat().resolvedOptions().timeZone).then(renderWeather).catch(e => {
    console.error(e)
    alert('Error downloading weather.')
})


function renderWeather({ current, daily, hourly}) {
    renderCurrentWeather(current)
    renderDailyWeather(daily)
 //  renderHourlyWeather(hourly)
    document.body.classList.remove('blurred')
}