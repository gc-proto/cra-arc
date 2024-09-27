function showDetails(resource) {
    const detailsText = document.getElementById('detailsText');
    
    switch(resource) {
        case 'taxBenefits':
            detailsText.innerHTML = `<strong>Tax Benefits:</strong> First Nations may be eligible for various tax exemptions and benefits. Visit the CRA website for more details.`;
            break;
        case 'fundingPrograms':
            detailsText.innerHTML = `<strong>Funding Programs:</strong> Explore various funding programs designed to support First Nations initiatives and projects.`;
            break;
        case 'financialLiteracy':
            detailsText.innerHTML = `<strong>Financial Literacy:</strong> Access tools and resources to improve your financial management skills and understanding.`;
            break;
        default:
            detailsText.innerHTML = `Click on a resource to learn more!`;
    }
}
