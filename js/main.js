let enrollment = [
  {year: "2017", enroll: 28321},
  {year: "2018", enroll: 28894},
  {year: "2019", enroll: 29460},
  {year: "2020", enroll: 30559},
  {year: "2021", enroll: 31701}
]

const chart = new Chart({width: 500, height: 200}, 'body', enrollment)
chart.updateVis()

//
// let enrollment_new = [
//   {year: "2017", enroll: 28321},
//   {year: "2018", enroll: 28894},
//   {year: "2019", enroll: 29460}
// ]
// chart.data = enrollment_new
// chart.updateVis()
