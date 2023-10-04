// Define a function to initialize a DataTable with gradient cell colors
function initializeDataTable(tableId, data) {
    // Create the DataTable
    var table = $(tableId).DataTable({
        data: data.slice(1), // Exclude the header row from sorting
        columns: data[0].map(function (header, index) {
            // Exclude the first column (index 0) from applying gradient colors
            if (index === 0) {
                return { title: header };
            } else {
                return { title: header, className: 'apply-gradient-color' };
            }
        }),
    });

    // Determine the minimum and maximum values for each column
    var minMaxValues = [];
    table.columns('.apply-gradient-color').every(function () {
        var columnData = this.data();
        var min = Math.min.apply(null, columnData);
        var max = Math.max.apply(null, columnData);
        minMaxValues.push({ min: min, max: max });
    });

    // Apply gradient colors to cells in columns with the 'apply-gradient-color' class
    table.cells('.apply-gradient-color').every(function () {
        var data = this.data();
        var cell = this.node();
        var columnIndex = this.index().column;

        if (columnIndex > 0) {
            var value = parseFloat(data);

            if (!isNaN(value)) {
                var min = minMaxValues[columnIndex - 1].min;
                var max = minMaxValues[columnIndex - 1].max;

                // Calculate color based on a gradient between two colors (e.g., red to green)
                var color = calculateGradientColor(min, max, value);
                $(cell).css('background-color', color);
            }
        }
    });

    // Function to calculate gradient color
    function calculateGradientColor(min, max, value) {
        var percentage = (value - min) / (max - min);
        var r = Math.round(255 * percentage);
        var g = Math.round(255 * (1 - percentage));
        var b = 0; // You can customize the gradient by changing the blue component
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
}

$(document).ready(function () {
    var vctch23 = [
        ["Name", "Age", "City"],
        ["Alice", 25, "New York"],
        ["Bob", 30, "Los Angeles"],
        ["Charlie", 22, "Chicago"],
    ];

    // Initialize DataTable with gradient colors and exclude the first column
    initializeDataTable('#VCTChamp23', vctch23);
});
