import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import './style.css';
import './favicon.ico';

cytoscape.use(coseBilkent);

let data = [];
const userInput = document.getElementById("userInput");
const addBtn = document.getElementById("addBtn");

const userInput2 = document.getElementById("userInput2");
const userInput3 = document.getElementById("userInput3");
const edge = document.getElementById("edge");

const cy = cytoscape({
    container: document.getElementById('cy'),
    elements: data,
    style: [
        {
            selector: 'node',
            style: {
                'background-color': '#666',
                'label': 'data(label)',
            }
        },
        {
            selector: 'edge',
            style: {
                'width': 3,
                'curve-style': 'bezier',
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'label': 'data(weight)'
            }
        }
    ],
    layout: {
        name: 'cose-bilkent',
        animate: false,
        gravityRangeCompound: 1.5,
        fit: true,
        tile: true
    }
});

function addNode() {
    const inputData = userInput.value.trim();
    if (inputData !== "") {
        const item = { data: { id: inputData, label: inputData } };
        data.push(item);
        cy.add(item);
        userInput.value = "";
        cy.layout({
            name: 'cose-bilkent',
            animate: false,
            gravityRangeCompound: 1.5,
            fit: true,
            tile: true
        }).run();
    }
}

function addEdge() {
    const inputData2 = userInput2.value.trim();
    const inputData3 = userInput3.value.trim();
    const elementId = `${inputData2}->${inputData3}`;

    const existingElement = cy.getElementById(elementId);
    if (existingElement.length !== 0) {
        console.log(`Element with ID ${elementId} already exists.`);
        return;
    }

    if (inputData2 !== "" && inputData3 !== "") {
        const item = { data: { id: elementId, source: inputData2, target: inputData3 } };
        data.push(item);
        cy.add(item);
        userInput2.value = "";
        userInput3.value = "";
        cy.layout({
            name: 'cose-bilkent',
            animate: false,
            gravityRangeCompound: 1.5,
            fit: true,
            tile: true
        }).run();
    }
}

addBtn.addEventListener("click", addNode);

userInput.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addNode();
    }
});

edge.addEventListener("click", addEdge);

userInput2.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        userInput3.focus(); // 다음 입력 필드로 포커스 이동
    }
});

userInput3.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addEdge();
    }
});
