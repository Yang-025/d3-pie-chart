import React, { useRef, useEffect } from "react"
import * as d3 from "d3"
import * as d3ScaleChromatic from "d3-scale-chromatic"
import "./App.css"
import { IData } from "./interface"

function App() {
  const svgRef = useRef<SVGSVGElement>(null)
  const width = 800
  const height = 400
  const radius = Math.min(width, height) / 2
  const data: IData[] = [
    { company: "統一", stores: 50 },
    { company: "全家", stores: 30 },
    { company: "萊爾富", stores: 20 },
    { company: "來來", stores: 10 },
  ]

  useEffect(() => {
    const pieChartGroup = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`)

    const colorScale: any = d3
      .scaleOrdinal(d3ScaleChromatic.schemePastel1)
      .domain(data.map(d => d.company))
    const pieGenerator = d3.pie<any>().value(d => d.stores)
    const arcGenerator = d3
      .arc<any>()
      .innerRadius(0)
      .outerRadius(radius * 0.8)

    pieChartGroup
      .selectAll("path")
      .data(pieGenerator(data))
      .join("path")
      .attr("fill", (d: any) => {
        return colorScale(d.data.company)
      })
      .attr("d", arcGenerator)
  }, [data, svgRef.current])

  return (
    <div className="app">
      <div>
        <h3>{`svg ${width}* ${height}`}</h3>
        <svg ref={svgRef} />
      </div>
    </div>
  )
}

export default App
