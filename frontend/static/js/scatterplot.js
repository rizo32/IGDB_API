export const scatterplot = () => {
    // Extract values
	let stockPrices = document.querySelectorAll("#stockclose");
	let yValues = Array.from(stockPrices).map((stockPrice) =>
		parseFloat(stockPrice.innerText)
	);

    // Make object { x:x, y:y } with values
	const dataPoints = yValues.map((value, index) => {
		return { x: -yValues.length + index, y: value };
	});

	// Create the scatter plot chart
	const canvas = document.getElementById("myChart").getContext("2d");
	const chart = new Chart(canvas, {
		type: "scatter",
		data: {
			datasets: [
				{
					data: dataPoints,
					backgroundColor: "rgba(255, 99, 132, 0.5)",
					borderColor: "rgb(255, 99, 132)",
				},
			],
		},
		options: {
			scales: {
				x: {
					title: {
						display: "true",
						text: "Days",
					},
					type: "linear",
					position: "bottom",
				},
				y: {
					title: {
						display: "true",
						text: "Closing price ($)",
					},
					type: "linear",
					position: "left",
				},
			},
			plugins: {
				legend: {
					display: false,
				},
			},
		},
	});
};
