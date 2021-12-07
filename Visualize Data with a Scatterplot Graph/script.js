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
  xScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (item) => {
        return item["Year"];
      }) - 1,
      d3.max(data, (item) => {
        return item["Year"];
      }) + 1,
    ])
    .range([padding + 25, width - padding]);

  yScale = d3
    .scaleTime()
    .domain([
      d3.min(data, (item) => {
        return new Date(item["Seconds"] * 1000);
      }),
      d3.max(data, (item) => {
        return new Date(item["Seconds"] * 1000);
      }),
    ])
    .range([padding + 25, height - padding]);
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

  //   svg
  //     .append("text")
  //     .attr("transform", "rotate(-90)")
  //     .attr("x", -200)
  //     .attr("y", 10)
  //     .style("font-size", 18)
  //     .text("Time in Minutes");

  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("r", "7")
    .attr("data-xvalue", (item) => {
      return item["Year"];
    })
    .attr("data-yvalue", (item) => {
      return new Date(item["Seconds"] * 1000); // milliseconds
    })
    .attr("cx", (item) => {
      return xScale(item["Year"]);
    })
    .attr("cy", (item) => {
      return yScale(new Date(item["Seconds"] * 1000));
    })
    .attr("fill", (item) => {
      if (item["URL"] === "") {
        return "lightgreen";
      } else {
        return "orange";
      }
    });
};

const generateAxis = () => {
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

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
  drawCanvas();
  generateScales();
  drawPoints();
  generateAxis();
});
