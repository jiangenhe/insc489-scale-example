const enrollment = [
  {year: "2017", enroll: 28321},
  {year: "2018", enroll: 28894},
  {year: "2019", enroll: 29460},
  {year: "2020", enroll: 30559},
  {year: "2021", enroll: 31701}
]
const margin = {top: 5, right: 5, bottom: 50, left: 5};

// Width and height as the inner dimensions of the chart area
const width = 500 - margin.left - margin.right,
  height = 200 - margin.top - margin.bottom;


const svg = d3.select('body').append('svg')
.attr('width', 500)
  .attr('height', 200)

const scaleR = d3.scaleLinear()
  .domain([0, d3.max(enrollment, d => d.enroll)])
  .range([0, 30])

const scaleX = d3.scaleBand()
  .domain(enrollment.map(d => d.year))
  .range([0, 400])

const scaleColor = d3.scaleLinear()
  .domain([d3.min(enrollment, d => d.enroll), d3.max(enrollment, d => d.enroll)])
  .range(['red', 'green'])

const axisX = d3.axisBottom(scaleX)

svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top+height})`).call(axisX)

const visG = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)
visG.selectAll('circle')
  .data(enrollment)
  .enter()
  .append('circle')
  .attr('r', d=>scaleR(d.enroll))
  .attr('cx', d=>scaleX(d.year) + scaleX.bandwidth()/2)
  .attr('cy', 50)
  .attr('fill', d=>scaleColor(d.enroll))



