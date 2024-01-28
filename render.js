import { ICON_MAP } from "./iconMap"

const currentIcon = document.querySelector('[data-current-icon]')


  function setValue(selector, value, { parent = document} = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value
}
  function getIconUrl(iconCode) {
    return `./public/icons/${ICON_MAP.get(iconCode)}.svg`
  }
  export function renderCurrentWeather(current) {
    currentIcon.src = getIconUrl(current.iconCode)
    setValue('current-temp', current.currentTemp)
    setValue('current-high', current.highTemp)
    setValue('current-low', current.lowTemp)
    setValue('current-fl-high', current.highFeelsLike)
    setValue('current-fl-low', current.lowFeelsLike)
    setValue('current-wind', current.windSpeed)
    setValue('current-precip', current.precip)  
  }
  export function renderDailyWeather() {
    
  }