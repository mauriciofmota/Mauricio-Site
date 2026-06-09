fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
        document.title = data.pageTitle;
        document.getElementById('main-title').textContent = data.mainHeading;
    })
    .catch(error => console.error('Error loading the text content:', error));