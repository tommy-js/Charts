import { variables } from "./configurationVar.js";

render();

function render() {
  // Get container div in which index.js sits.
  let container = document.getElementById(variables.id);

  // Creates block element where the render sits.
  let block = document.createElement("div");
  block.style = `position: relative; border: ${variables.border}; width: ${variables.width}; height: ${variables.height};`;
  container.appendChild(block);

  // Get actual height and width of element.
  let positionContents = block.getBoundingClientRect();
  let actualHeight = positionContents.height;
  let actualWidth = positionContents.width;

  // Creates inner element within block.
  let innerBlock = document.createElement("div");
  let innerWidth = actualWidth * 0.8;
  let innerHeight = actualHeight * 0.8;
  innerBlock.style = `position: absolute; top: 0; border: ${variables.border}; width: ${innerWidth}px; height: ${innerHeight}px`;
  container.appendChild(innerBlock);
}
