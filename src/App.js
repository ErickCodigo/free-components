import React from "react";
import {Bar} from "react-chartjs-2";
import "./Tooltips.css";

const rawData = [
    {
        x: 0,
        y: 30990,
        r: 4,
        toolTipsData: {
            trend: {compareToPre: "No change", diff: 0},
            updatedOn: "2020-08-14T10:00:00",
        },
    },
    {
        x: 21,
        y: 29990,
        r: 4,
        toolTipsData: {
            trend: {compareToPre: "Price decrease", diff: -1000},
            updatedOn: "2020-09-04T12:39:39.9",
        },
    },
    {
        x: 31,
        y: 29990,
        r: 4,
        toolTipsData: {
            trend: {compareToPre: "No change", diff: 0},
            updatedOn: "2020-09-13T17:09:46.469412",
        },
    },
];

const randomBetween = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

// utils
const fallbackAction = (index) => index;

const createFakeData = (len = 1, action = fallbackAction) => {
    return new Array(len).fill(null).map((_, i) => action(i));
}

const len = 12;

// final utils

const fakeData = createFakeData(len, index => {
    return {
        x: index + 1,
        y: (index + 1) * randomBetween(1, 20)
    }
})

const sampleData = (canvas) => {
    const ctx = canvas.getContext("2d");

    //1. Using gradient background.
    let gradient = ctx.createLinearGradient(0, 0, 0, 150);
    gradient.addColorStop(0, "rgba(0, 124, 194, 0.1)");
    gradient.addColorStop(0.5, "rgba(0, 124, 194, 0.3)");
    gradient.addColorStop(1, "rgba(0, 124, 194, 0.7)");

    return {
        labels: fakeData.map((item) => {
            return item.x;
        }),
        datasets: [
            {
                backgroundColor: gradient,
                pointBackgroundColor: "#fff",
                data: fakeData.map(item => ({
                    x: item.x,
                    y: item.y
                }))
            },
        ],
    };
};

const customTooltips = function (tooltip) {
    console.log(tooltip.body)

    if (!tooltip) {
        return;
    }
    // Tooltip Element
    let tooltipEl = document.getElementById("chartjs-tooltip");

    if (!tooltipEl) {
        tooltipEl = document.createElement("div");
        tooltipEl.id = "chartjs-tooltip";
        document.body.appendChild(tooltipEl);
    }

    // Set caret Position
    tooltipEl.classList.remove("above", "below", "no-transform");
    if (tooltip.yAlign) {
        tooltipEl.classList.add(tooltip.yAlign);
    } else {
        tooltipEl.classList.add("no-transform");
    }
    const getBody = (bodyItem) => bodyItem.lines;

    //Hide the tooltips when mouseout
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    // Set custom tooltip
    if (tooltip.body) {
        const bodyLines = tooltip.body.map(getBody);
        const tooltipData = bodyLines[0][0].rawDataItem;

        let innerHtml = "<div class='arrow_box'>";
        innerHtml += `<div><h2 style="text-align: center; margin: .4rem">${tooltipData.y}</h2></div><div>Pólizas cobradas</div>`;
        innerHtml += "</div>";

        // Set inner html to tooltip
        tooltipEl.innerHTML = innerHtml;
        let chartElement = this._chart.canvas.getBoundingClientRect();
        // Calculate position
        const positionY = chartElement.top + tooltip.yPadding;
        const positionX = chartElement.left + tooltip.xPadding;
        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = positionX + tooltip.caretX + "px";
        tooltipEl.style.top = positionY + tooltip.caretY + 10 + "px";
    }
};

const ComstomizedTooltips = (props) => {
    return (
        <Bar
            width={600}
            height={250}
            data={sampleData}
            type="bar"
            options={{
                // solución ID 1
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                callback: (value) => {
                                    return `${value} JUL`;
                                },
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: false,
                                callback: function (value, index, values) {
                                    return value + (value > 0 ? "k" : "");
                                }
                            }
                        }
                    ]
                },
                // ID 2
                tooltips: {
                    enabled: false,
                    custom: customTooltips,
                    callbacks: {
                        label: (tooltipItem, data) => {

                            console.log(tooltipItem)

                            const rawDataItem = fakeData.find(
                                (item) => item.x === tooltipItem.xLabel
                            );

                            return {
                                label: tooltipItem.xLabel,
                                rawDataItem
                            };
                        },
                    },
                },
            }}
        />
    );
};

export default ComstomizedTooltips;
