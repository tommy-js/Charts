import { variables, data } from "./configurationVar.js";

render();

function render() {
  // Get container div in which index.js sits.
  let container = document.getElementById(variables.id);

  // Creates block element where the render sits.
  let block = document.createElement("div");
  block.style = `display: flex; border: ${variables.border}; width: ${variables.width}; height: ${variables.height};`;
  container.appendChild(block);

  // Get actual height and width of element.
  let positionContents = block.getBoundingClientRect();
  let actualHeight = positionContents.height;
  let actualWidth = positionContents.width;

  // Creates inner element within block.
  let innerBlock = document.createElement("div");
  let innerWidth = actualWidth * 0.8;
  let innerHeight = actualHeight * 0.9;
  innerBlock.style = `top: 0; border: ${variables.border}; width: ${innerWidth}px; height: ${innerHeight}px; margin-left: auto; margin-right: auto; box-sizing: border-box;`;
  block.appendChild(innerBlock);

  // Creates label for chart.
  let labelBlock = document.createElement("div");
  let labelBlockHeight = innerHeight * 0.1;
  labelBlock.style = `position: relative; display: block; height: ${labelBlockHeight}px; width: ${innerWidth}px; border: ${variables.border}; box-sizing: border-box;`;
  // Creates label text div.
  let label = document.createElement("div");
  label.style = `border: ${variables.border}; text-align: center; width: ${innerWidth}px; margin-left: auto; margin-right: auto; font-size: ${variables.fontSize}px; box-sizing: border-box;`;
  label.innerHTML = `${variables.label}`;
  labelBlock.appendChild(label);
  innerBlock.appendChild(labelBlock);

  // Creates visual element.
  let visualBlock = document.createElement("div");
  let visualBlockHeight = innerHeight * 0.9;
  visualBlock.style = `position: relative; display: block; height: ${visualBlockHeight}px; width: ${innerWidth}px; border: ${variables.border}; box-sizing: border-box;`;
  innerBlock.appendChild(visualBlock);

  // Creates pie chart element.
  let pieChart = document.createElement("ul");
  pieChart.setAttribute("class", "pie_chart");
  let scaledSize = innerWidth * 0.9;
  pieChart.style = `width: ${scaledSize}px; height: ${scaledSize}px;`;
  visualBlock.appendChild(pieChart);

  // Creates text element.
  let textBlock = document.createElement("div");
  let textBlockHeight = innerHeight * 0.1;
  textBlock.style = `position: relative; text-align: center; display: block; height: ${textBlockHeight}px; width: ${innerWidth}px; border: ${variables.border}; box-sizing: border-box; transition: 0.2s;`;
  textBlock.setAttribute("class", "textBlock");
  innerBlock.appendChild(textBlock);

  // Creates pie-chart elements.
  for (let i = 0; i < data.length; i++) {
    castPie(data[i].title, data[i].fraction, data[i].color, i, data);
  }
}

async function castPie(title, fraction, color, i, data) {
  // Calculates necessary rotation and width of the slice.
  let sliceWidth = 360 * (fraction / 100);
  console.log("sliceWidth: " + sliceWidth);
  let move = 0;
  for (let j = 0; j < i; j++) {
    let indSliceWidth = 360 * (data[j].fraction / 100);
    move += indSliceWidth;
  }
  console.log(move);

  // Creates list element component.
  let slice = document.createElement("li");
  slice.classList.add("slice");
  slice.classList.add(`slice${i}`);
  slice.style = `transform: rotate(${move}deg) skewY(${sliceWidth}deg); overflow: hidden; position: absolute; top: 0; right: 0; width: 50%; height: 50%; transform-origin: 0% 100%;`;

  let sliceContents = document.createElement("div");
  sliceContents.classList.add("slice-contents");
  sliceContents.style = `background-color: ${color}; transform: skewY(-${sliceWidth}deg); position: absolute; left: -100%; width: 200%; height: 200%; border-radius: 50%; transition: 0.2s;`;

  let largeBlock = document.getElementsByClassName("pie_chart");
  largeBlock.style =
    "position: relative; border: dashed 1px; padding: 0; border-radius: 50%; list-style: none; margin-left: auto; margin-right: auto; margin-top: 10px;";
  slice.appendChild(sliceContents);
  largeBlock[0].appendChild(slice);

  // Gets textblock so that we can show name and info of company
  let textBlock = document.getElementsByClassName("textBlock");

  slice.addEventListener("mouseover", function () {
    sliceContents.style.backgroundColor = "red";
    textBlock[0].innerHTML = `${title} (${fraction}%)`;
  });
  slice.addEventListener("mouseout", function () {
    sliceContents.style.backgroundColor = color;
    textBlock[0].innerHTML = "";
  });
}
