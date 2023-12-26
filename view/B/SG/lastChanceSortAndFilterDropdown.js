var countryPrefix = localStorage.getItem("urlPrefix");
document.write('\
<div class="sort-filter">\
    <select id="sortDropdown" onchange="updateProducts()">\
        <option value="name_ASC">Name (Ascending)</option>\
        <option value="name_DESC">Name (Descending)</option>\
        <option value="price_ASC">Price (Low to High)</option>\
        <option value="price_DESC">Price (High to Low)</option>\
    </select>\
    <select id="categoryDropdown" onchange="updateProducts()">\
        <option value="">All Categories</option>\
        <!-- Add other categories here -->\
    </select>\
</div>');

function updateProducts() {
    var sortValue = document.getElementById('sortDropdown').value;
    var categoryValue = document.getElementById('categoryDropdown').value;

    var [sortField, sortOrder] = sortValue.split('_');

    var newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
    var queryParams = [];
    if (sortField && sortOrder) {
        queryParams.push('sortField=' + encodeURIComponent(sortField));
        queryParams.push('sortOrder=' + encodeURIComponent(sortOrder));
    }
    if (categoryValue) {
        queryParams.push('categoryFilter=' + encodeURIComponent(categoryValue));
    }

    if (queryParams.length > 0) {
        newUrl += '?' + queryParams.join('&');
    }
    window.location.href = newUrl;
}

document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    var params = new URLSearchParams(window.location.search);
    var sortField = params.get('sortField');
    var sortOrder = params.get('sortOrder');
    var categoryFilter = params.get('categoryFilter');

    // Set the dropdowns to reflect current URL parameters
    if (sortField && sortOrder) {
        document.getElementById('sortDropdown').value = sortField + '_' + sortOrder;
    }

    if (categoryFilter) {
        document.getElementById('categoryDropdown').value = categoryFilter;
    }

    // Populate category dropdown
    var categories = ["Tables & Desks", "Bathroom", "Beds & Mattresses", "Sofas & Chair", "Cabinets & Storage", "Lightings", "Study", "Children", "All Retail Products"];
    var categoryDropdown = document.getElementById('categoryDropdown');
    categories.forEach(function(category) {
        var option = document.createElement('option');
        option.value = category;
        option.text = category;
        if (category === categoryFilter) {
            option.selected = true;
        }
        categoryDropdown.appendChild(option);
    });
});