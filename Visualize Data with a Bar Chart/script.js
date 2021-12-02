const datasetURL =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

let data = [];
const width = 800;
const height = 600;
const svg = d3.select("svg"); // selects the svg tag

// set the width and height of the svg
const drawCanvas = () => {
  svg.attr("width", width);
  svg.attr("height", height);
};

const generateScales = () => {};

// bars and tooltips will be drawn here
const drawBars = () => {};

const generateAxis = () => {};

d3.json(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then((res) => {
  data = res.data;
  console.log("data: ", data);
});
