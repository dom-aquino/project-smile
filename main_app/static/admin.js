const generateTableButton = document.querySelector('#generateTable');

generateTableButton.addEventListener("click", function() {
    console.log("Generate table button is clicked.");
});

const generateTable = async () => {
    const response = await fetch('/api/test', {
        method: 'POST',
        body: 'sample',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const myResponse = await response.json();
    console.log(myResponse);
}

