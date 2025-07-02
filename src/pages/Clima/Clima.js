import { Select } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./Clima.css"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import ChangeMap from "../../components/ChangeMap";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
const {Option} = Select

const key = "b64112169b1d4f9abda162807250107"

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
)

function Clima(){
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState(null)
    const [mapCenter, setMapCenter] = useState([-15.7939869, -47.8828])
    const [weather, setWeather] = useState(null)
    const [forecast, setForecast] = useState([])

    const fetchCitiesData = useCallback(async()=>{
        try {
            const {data} = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/municipios")

            const ordenadedCities = data.sort((a, b)=>
                a.nome.localeCompare(b.nome, 'pt', {sensitivity: 'base'})
            )
            setCities(ordenadedCities)
            
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(()=>{
        fetchCitiesData()
    }, [fetchCitiesData])

    const handleSelectCity = async(value) =>{
        const city = cities.find((c) =>c.id === value)
        const name = `${city.nome}- ${city.microrregiao.mesorregiao.UF.sigla}`

        try {
            const locData = await axios.get("https://nominatim.openstreetmap.org/search", {
                params: {
                    q: name,
                    format: 'json'
                }
            })
            if (locData.data.length > 0){
                const {lat, lon} = locData.data[0]
                setSelectedCity({
                    name,
                    lat: parseFloat(lat),
                    lon: parseFloat(lon)
                })
                setMapCenter([lat, lon])

                const weatherData = await axios.get("https://api.weatherapi.com/v1/current.json", {
                    params: {
                        key: key,
                        q: `${lat}, ${lon}`,
                        lang: "pt"
                    }
                })
                setWeather(weatherData.data.current)

                const forecastData = await axios.get("https://api.weatherapi.com/v1/forecast.json", {
                    params: {
                        key: key,
                        q: `${lat}, ${lon}`,
                        lang: "pt",
                        days: 1
                    }
                })
                setForecast(forecastData.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const hourly = forecast?.forecast?.forecastday?.[0]?.hour || [];
    const hours = hourly.map(h => h.time.split(' ')[1])
    const temp = hourly.map(t => t.temp_c);

    const chartData = {
        labels: hours,
        datasets: [
            {
                label: "Temperatura °C",
                borderColor: "red",
                backgroundColor: "red",
                width: "75%",
                data: temp,
                tension: 0,
                fill: true,
                pointRadius: 0,
            }
        ]
    }

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top"
            }
        },
        scales:{
                y:{
                    beginAtZero: true,
                    ticks:{
                        callback: function(value){
                            return `${value}°`
                        }
                    }
                }
            }
    }

    return(
        <div className="clima">
            <h1>Clima</h1>
            <Select
                showSearch
                onChange={handleSelectCity}
                placeholder="Pesquisar por cidade"
                filterOption={(input, option)=> option.children.toLowerCase().includes(input.toLowerCase())}
            >
                {cities.map(city=>(
                    <Option key={city.id} value={city.id}>{`${city.nome}${city.microrregiao?.mesorregiao?.UF?.sigla ? ` - ${city.microrregiao.mesorregiao.UF.sigla}` : ''}`}</Option>
                ))}
            </Select>

            <div className="informações">
                <MapContainer
                    center={mapCenter}
                    zoom={13}
                    style={{ height: '400px', width: '50%', marginTop: '20px' }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors"/>
                    <ChangeMap center={mapCenter}/>
                    <Marker position={mapCenter}>
                        {selectedCity? <Popup>{selectedCity.nome}</Popup> : <Popup>Brasília</Popup>}
                    </Marker>
                </MapContainer>

                {weather ? (
                    <section>
                        {weather.is_day ? <p>Dia</p> : <p>Noite</p>}
                        <p>Temperatura: {weather.temp_c}°C</p>
                        <p>Sensação Térmica: {weather.feelslike_c}°C</p>
                        <p>Umidade: {weather.humidity}%</p>
                        <p>Condição: {weather.condition.text} <img src={weather.condition.icon} width={40} alt={weather.condition.text}/></p>
                        <p>Vento: {weather.wind_kph}Km/h - {weather.wind_dir}</p>
                        <p>Índice UV: {weather.uv}</p>
                    </section>

                ) : <p>Selecione uma cidade</p>}
            </div>
            <div className="grafico">
                <Line data={chartData} options={chartOptions}/>
            </div>
            
        </div>
    )
}

export default Clima;