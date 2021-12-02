const datasetURL =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const width = 800;
const height = 600;

d3.json(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then((data) => {
  console.log(data.data);
});
