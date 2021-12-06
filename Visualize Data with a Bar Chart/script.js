const datasetURL =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

let data = [];
const width = 800;
const height = 550;
const padding = 20;
const svg = d3.select("svg");
let heightScale;
let xScale;
let xAxisScale;
let yAxisScale;

// set the width and height of the svg
const drawCanvas = () => {
  svg.attr("width", width);
  svg.attr("height", height);
};

const generateScales = () => {
  heightScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, (item) => {
        return item[1];
      }),
    ])
    .range([0, height - 2 * padding]);

  // to be able to position the bars along the x-axis
  xScale = d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([padding + 20, width - padding]);

  const datesArray = data.map((item) => {
    return new Date(item[0]);
  });

  xAxisScale = d3
    .scaleTime()
    .domain([d3.min(datesArray), d3.max(datesArray)])
    .range([padding + 20, width - padding]);

  const maxGDP = d3.max(data, (item) => {
    return item[1];
  });

  yAxisScale = d3
    .scaleLinear()
    .domain([0, maxGDP])
    .range([height - padding, padding]);
};

// bars and tooltips will be drawn here
const drawBars = () => {
  // create a tooltip
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .style("width", "auto")
    .style("height", "auto");

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("width", (width - 2 * padding) / data.length)
    .attr("data-date", (item) => {
      return item[0];
    })
    .attr("data-gdp", (item) => {
      return item[1];
    })
    .attr("height", (item) => {
      return heightScale(item[1]);
    })
    .attr("x", (item, index) => {
      return xScale(index);
    })
    .attr("y", (item) => {
      // push it down by the height and padding, then push it up by the heigth of the bar
      return height - padding - heightScale(item[1]);
    })
    .on("mouseover", (event, item) => {
      i = data.indexOf(item);
      console.log(event.pageX);
      tooltip
        .style("visibility", "visible")
        .style("position", "absolute")
        .style("top", height - 100 + "px")
        .style("left", event.pageX + "px")
        .html(`<p>${item[0]}</p><p>${item[1]}</p>`);
      document.querySelector("#tooltip").setAttribute("data-date", item[0]);
    })
    .on("mouseout", (item) => {
      tooltip.style("visibility", "hidden");
    });
};

const generateAxis = () => {
  const xAxis = d3.axisBottom(xAxisScale);
  const yAxis = d3.axisLeft(yAxisScale);

  svg
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", "translate(0," + (height - padding) + ")");

  svg
    .append("g")
    .call(yAxis)
    .attr("id", "y-axis")
    .attr("transform", "translate(" + (padding + 20) + ",0)");
};

d3.json(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then((res) => {
  data = res.data;
  drawCanvas();
  generateScales();
  drawBars();
  generateAxis();
});

