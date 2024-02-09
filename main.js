import './style.css';
import { getWeather } from './weather'
import { renderCurrentWeather, renderDailyWeather, renderHourlyWeather } from './render';
import { returnLocation } from './location'
import { setValue } from './render';
const hourlySection = document.querySelector('[data-hour-section]')
const openButton = document.querySelector('[data-open-modal]')
const closeButton = document.querySelector('[data-close-modal]')
const modal = document.querySelector('[data-modal]')
const searchInput = document.querySelector('[data-loc-search]')
const body = document.querySelector('[data-body]')
const template = document.querySelector('[data-template]')
let lat
let long
const cityName = document.querySelector('[data-city-name]')
const searchButton = document.querySelector('[data-search-button]')
const loader = document.querySelector('[data-loader]')


openButton.addEventListener('click', () => {
    modal.show()
    
})
closeButton.addEventListener('click', () => {
    modal.close()
})
searchInput.addEventListener('focusin', () => {
    body.innerHTML = ''
})
searchInput.addEventListener('focusout', () => {
    searchInput.value = ''
})

searchInput.addEventListener('input', () => {
    body.innerHTML = ''
    let phrase = searchInput.value
    returnLocation(phrase).then(render)
    
    
})

function render(ans) {
    
    ans.forEach((answ,index) => {        
        const element = template.content.cloneNode(true)
        setValue('name', answ.name, { parent: element })
        setValue('country', answ.country, { parent: element })
        setValue('admin1', answ.admin1, { parent: element })
        setValue('admin2', answ.admin2, { parent: element })
        setValue('admin3', answ.admin3, { parent: element })
        setValue('population', answ.population, { parent: element })
        const bttn = element.querySelector('[data-select]')    
        bttn.setAttribute('data-no', index)  
        body.append(element)       
    })

    body.addEventListener('click', e => {
        if (e.target.tagName.toLowerCase() === 'button') {
 //           hourlySection.innerHTML = ''
            let indexToretrive =e.target.getAttribute('data-no')
            lat = ans[indexToretrive].latitude
            long = ans[indexToretrive].longitude
            setTimeout(()=>{cityName.textContent = ans[indexToretrive].name}, 1000)                  
            getWeather(
                lat,
                long,
                Intl.DateTimeFormat().resolvedOptions().timeZone
                ).then(renderWeather).catch(e => {
                        console.error(e)
                        alert('Error getting weather')
                    })
        }
    })
    
}

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
    alert('Error while getting location. Allow us to use your location and refresh the page or SEARCH for locatiom')
    

}



function clearWeather({ current, daily, hourly}) {
    
}

function renderWeather({ current, daily, hourly}) {
    renderCurrentWeather(current)
    renderDailyWeather(daily)
    renderHourlyWeather(hourly)
    loader.style.display = 'none'
}
