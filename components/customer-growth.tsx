"use client"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { scaleLinear } from "d3-scale"

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/south-africa/south-africa-provinces.json"

const cities = [
  { name: "Gauteng", coordinates: [28.0436, -26.2023], value: 30 },
  { name: "Cape Town", coordinates: [18.4241, -33.9249], value: 30 },
  { name: "Durban", coordinates: [31.0218, -29.8587], value: 30 },
]

const colorScale = scaleLinear<string>().domain([0, 30]).range(["#ffedea", "#ff5233"])

export function CustomerGrowth() {
  return (
    <div className="relative h-[350px] w-full rounded-lg bg-zinc-50 p-4">
      <div className="absolute right-4 top-4 flex items-center gap-2">
        {cities.map((city) => (
          <div key={city.name} className="flex items-center gap-1">
            <div className="size-2 rounded-full" style={{ backgroundColor: colorScale(city.value) }} />
            <span className="text-xs">
              {city.name} {city.value}%
            </span>
          </div>
        ))}
      </div>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1200,
          center: [25, -28.5],
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC" stroke="#D6D6DA" />)
          }
        </Geographies>
        {cities.map(({ name, coordinates, value }) => (
          <Marker key={name} coordinates={coordinates as [number, number]}>
            <circle r={10} fill={colorScale(value)} stroke="#fff" strokeWidth={2} />
            <text textAnchor="middle" y={-15} style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "8px" }}>
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  )
}

