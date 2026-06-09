fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
        document.title = data.pageTitle;
        document.getElementById('main-title').textContent = data.mainHeading;
        document.getElementById('BioBox').textContent = data.BioBox;


        document.getElementById('cpp-icon-img').src = data.CppImage;
    })
    .catch(error => console.error('Error loading the text content:', error));