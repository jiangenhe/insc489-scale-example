class Chart{
  constructor (_config, parentElement, data) {
    this.config = {
      width: _config.width,
      height: _config.height,
      margin: {top: 5, right: 5, bottom: 50, left: 5},
      parentElement: parentElement
    }
    this.config.visWidth = this.config.width - this.config.margin.left - this.config.margin.right;
    this.config.visHeight = this.config.height - this.config.margin.top - this.config.margin.bottom;
    this.data = data
    this.initVis()
  }

  initVis ()  {
    const vis = this;

    vis.svg = d3.select(vis.config.parentElement).append('svg')
      .attr('width', vis.config.width)
      .attr('height', vis.config.height)

    vis.scaleR = d3.scaleLinear()
      .range([0, vis.config.margin.bottom])

    vis.scaleX = d3.scaleBand()
      .range([0, vis.config.width])

    vis.scaleColor = d3.scaleLinear()
      .range(['red', 'green'])

    vis.axisXGroup = vis.svg.append('g').attr('transform', `translate(${vis.config.margin.left}, ${vis.config.margin.top+vis.config.visHeight})`)

    vis.visG = vis.svg.append('g').attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`)

  }

  updateVis () {
    const vis = this
    vis.scaleR
      .domain([0, d3.max(vis.data, d => d.enroll)])

    vis.scaleX
      .domain(vis.data.map(d => d.year))

    vis.scaleColor
      .domain([d3.min(vis.data, d => d.enroll), d3.max(vis.data, d => d.enroll)])

    vis.axisX = d3.axisBottom(vis.scaleX)


    vis.renderVis()
  }

  renderVis () {
    const vis = this
    vis.visG.selectAll('circle')
      .data(vis.data)
      .join('circle')
      .attr('r', d=>vis.scaleR(d.enroll))
      .attr('cx', d=>vis.scaleX(d.year) + vis.scaleX.bandwidth()/2)
      .attr('cy', 50)
      .attr('fill', d=>vis.scaleColor(d.enroll))

    vis.axisXGroup.call(vis.axisX)
  }

}
