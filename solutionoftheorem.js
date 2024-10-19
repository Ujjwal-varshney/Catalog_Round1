const fs = require('fs');

// Function to decode the y value based on the provided base
function decodeValue(value, base) {
    return parseInt(value, base);
}

// Function to perform Lagrange interpolation and find the constant term
function lagrangeInterpolation(points) {
    let constant = 0;

    for (let i = 0; i < points.length; i++) {
        let xi = points[i][0];
        let yi = points[i][1];
        
        let li = 1;
        
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let xj = points[j][0];
                li *= (-xj) / (xi - xj);
            }
        }

        constant += yi * li;
    }

    return Math.round(constant);
}

// Main function to process the input JSON
function processInput(jsonInput) {
    const n = jsonInput.keys.n;
    const k = jsonInput.keys.k;
    
    let points = [];

    // Collect the first k points (since we need at least k points to solve the polynomial)
    let count = 0;
    for (let key in jsonInput) {
        if (key === 'keys') continue; // Skip the "keys" part
        
        let x = parseInt(key); // x is the key
        let base = parseInt(jsonInput[key].base); // Base of y
        let value = jsonInput[key].value; // Encoded y value
        
        // Decode y
        let y = decodeValue(value, base);
        
        // Add the (x, y) pair to points
        points.push([x, y]);
        count++;
        
        // Stop after collecting k points
        if (count === k) break;
    }
    
    // Perform Lagrange interpolation to find the constant term
    const secret = lagrangeInterpolation(points);
    
    return secret;
}

// Read the input JSON from file
fs.readFile('testcase1.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    
    const jsonInput1 = JSON.parse(data);
    const secret1 = processInput(jsonInput1);
    
    console.log("Secret for Test Case 1:", secret1);
});

// Second test case
fs.readFile('testcase2.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    
    const jsonInput2 = JSON.parse(data);
    const secret2 = processInput(jsonInput2);
    
    console.log("Secret for Test Case 2:", secret2);
});