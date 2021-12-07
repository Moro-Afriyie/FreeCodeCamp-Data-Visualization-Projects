const datasetURL =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

let data = [];
const width = 800;
const height = 550;
const padding = 20;
const svg = d3.select("svg");
let xScale;
let yScale;
let xAxisScale;
let yAxisScale;

// set the width and height of the svg
const drawCanvas = () => {
  svg.attr("width", width);
  svg.attr("height", height);
};

const generateScales = () => {
  xScale = d3.scaleLinear().range([padding + 25, width - padding]);
  yScale = d3.scaleTime().range([padding, height - padding]);
};

const drawPoints = () => {
  // create a tooltip
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .style("width", "auto")
    .style("height", "auto");

  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("r", "5")
    .attr("data-xvalue", (item) => {
      return item["Year"];
    })
    .attr("data-yvalue", (item) => {
      return new Date(item["Seconds"] * 1000); // milliseconds
    });
};

const generateAxis = () => {
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", "translate(0, " + (height - padding) + ")");

  svg
    .append("g")
    .call(yAxis)
    .attr("id", "y-axis")
    .attr("transform", "translate(" + (padding + 25) + ",0)");
};

d3.json(datasetURL).then((res) => {
  data = res;
  console.log(data);
  drawCanvas();
  generateScales();
  drawPoints();
  generateAxis();
});
