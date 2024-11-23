import React, { useEffect, useState } from 'react';
import {XYPlot, LineSeries, Crosshair, DiscreteColorLegend, XAxis, YAxis, HorizontalGridLines, VerticalGridLines} from 'react-vis';
import 'react-vis/dist/style.css';


const Graph = ({trendQuery, graphData}) => {

    // State to hold the data for the graph and the hovered data
    const [chartData, setChartData] = useState([]);
    const [crosshairData, setCrosshairData] = useState([]);
    const townColors = [
        { town: "Middletown", color: "#1f77b4" },
        { town: "Windsor Locks", color: "#bdc3c7" },
        { town: "Madison", color: "#ec7063" },
        { town: "Killingly", color: "#af7ac5" },
        { town: "Waterbury", color: "#f8c471" },
        { town: "Harwinton", color: "#f8c471" },
        { town: "Trumbull", color: "#7dcea0" },
        { town: "New Haven", color: "#7f7f7f" },
        { town: "Prospect", color: "#2980b9" },
        { town: "Stonington", color: "#34495e" },
        { town: "Cromwell", color: "#a2d9ce" },
        { town: "Brooklyn", color: "#f1948a" },
        { town: "Stamford", color: "#e74c3c" },
        { town: "Branford", color: "#8c564b" },
        { town: "Orange", color: "#8c564b" },
        { town: "New Hartford", color: "#45b39d" },
        { town: "Beacon Falls", color: "#85c1e9" },
        { town: "Bozrah", color: "#5dade2" },
        { town: "Sprague", color: "#27ae60" },
        { town: "Deep River", color: "#5dade2" },
        { town: "East Hampton", color: "#e67e22" },
        { town: "Colebrook", color: "#d62728" },
        { town: "Eastford", color: "#8e44ad" },
        { town: "Pomfret", color: "#52be80" },
        { town: "Scotland", color: "#a9cce3" },
        { town: "Avon", color: "#7dcea0" },
        { town: "Windham", color: "#aed6f1" },
        { town: "Simsbury", color: "#aab7b8" },
        { town: "Thomaston", color: "#aab7b8" },
        { town: "Manchester", color: "#85c1e9" },
        { town: "East Haddam", color: "#8c564b" },
        { town: "Lyme", color: "#aed6f1" },
        { town: "Ridgefield", color: "#8e44ad" },
        { town: "Bethany", color: "#d7bde2" },
        { town: "Enfield", color: "#9b59b6" },
        { town: "West Haven", color: "#e59866" },
        { town: "Southbury", color: "#e74c3c" },
        { town: "Southington", color: "#8e44ad" },
        { town: "Barkhamsted", color: "#229954" },
        { town: "Plainville", color: "#2874a6" },
        { town: "Sterling", color: "#aed6f1" },
        { town: "Putnam", color: "#d5d8dc" },
        { town: "Litchfield", color: "#f8c471" },
        { town: "Essex", color: "#f5cba7" },
        { town: "Roxbury", color: "#27ae60" },
        { town: "North Canaan", color: "#ff7f0e" },
        { town: "Franklin", color: "#d35400" },
        { town: "Milford", color: "#5dade2" },
        { town: "Cheshire", color: "#d35400" },
        { town: "Montville", color: "#8e44ad" },
        { town: "East Windsor", color: "#f39c12" },
        { town: "Willington", color: "#2980b9" },
        { town: "Hamden", color: "#cb4335" },
        { town: "Weston", color: "#1f618d" },
        { town: "Brookfield", color: "#d5d8dc" },
        { town: "Burlington", color: "#f5b041" },
        { town: "Norwich", color: "#af7ac5" },
        { town: "Lebanon", color: "#85c1e9" },
        { town: "Coventry", color: "#e59866" },
        { town: "Ledyard", color: "#16a085" },
        { town: "Woodstock", color: "#e74c3c" },
        { town: "Woodbury", color: "#eb984e" },
        { town: "North Stonington", color: "#82e0aa" },
        { town: "Washington", color: "#73c6b6" },
        { town: "Killingworth", color: "#229954" },
        { town: "Sherman", color: "#1abc9c" },
        { town: "Voluntown", color: "#e74c3c" },
        { town: "Preston", color: "#8e44ad" },
        { town: "Woodbridge", color: "#85c1e9" },
        { town: "Tolland", color: "#6c3483" },
        { town: "Salem", color: "#85c1e9" },
        { town: "Cornwall", color: "#7fb3d5" },
        { town: "Norfolk", color: "#2ca02c" },
        { town: "Wallingford", color: "#1abc9c" },
        { town: "Marlborough", color: "#f5cba7" },
        { town: "Fairfield", color: "#cb4335" },
        { town: "Derby", color: "#f5cba7" },
        { town: "Hartland", color: "#9467bd" },
        { town: "Meriden", color: "#e67e22" },
        { town: "Naugatuck", color: "#8c564b" },
        { town: "Monroe", color: "#82e0aa" },
        { town: "Canterbury", color: "#d6dbdf" },
        { town: "North Branford", color: "#f8c471" },
        { town: "Redding", color: "#ff7f0e" },
        { town: "Ashford", color: "#27ae60" },
        { town: "East Granby", color: "#2874a6" },
        { town: "Old Lyme", color: "#2980b9" },
        { town: "South Windsor", color: "#58d68d" },
        { town: "Glastonbury", color: "#7fb3d5" },
        { town: "Berlin", color: "#16a085" },
        { town: "Bridgeport", color: "#e74c3c" },
        { town: "Wethersfield", color: "#f8c471" },
        { town: "Newington", color: "#7d3c98" },
        { town: "Danbury", color: "#2874a6" },
        { town: "Lisbon", color: "#9b59b6" },
        { town: "Suffield", color: "#bcbd22" },
        { town: "Middlebury", color: "#5dade2" },
        { town: "New Canaan", color: "#9b59b6" },
        { town: "East Haven", color: "#bdc3c7" },
        { town: "Greenwich", color: "#3498db" },
        { town: "Torrington", color: "#cb4335" },
        { town: "Haddam", color: "#f5cba7" },
        { town: "Easton", color: "#229954" },
        { town: "Granby", color: "#bcbd22" },
        { town: "Oxford", color: "#e59866" },
        { town: "Chaplin", color: "#73c6b6" },
        { town: "Seymour", color: "#d35400" },
        { town: "Watertown", color: "#f5cba7" },
        { town: "Sharon", color: "#ec7063" },
        { town: "Stafford", color: "#16a085" },
        { town: "Wilton", color: "#d5d8dc" },
        { town: "East Lyme", color: "#8e44ad" },
        { town: "Bethlehem", color: "#d5d8dc" },
        { town: "Old Saybrook", color: "#2980b9" },
        { town: "Goshen", color: "#dc7633" },
        { town: "Kent", color: "#abebc6" },
        { town: "Warren", color: "#e67e22" },
        { town: "Morris", color: "#f39c12" },
        { town: "Hampton", color: "#1abc9c" },
        { town: "Ellington", color: "#a2d9ce" },
        { town: "Clinton", color: "#e74c3c" },
        { town: "Canaan", color: "#2c3e50" },
        { town: "New Britain", color: "#5d6d7e" },
        { town: "Hartford", color: "#16a085" },
        { town: "Westbrook", color: "#f5b041" },
        { town: "Rocky Hill", color: "#8e44ad" },
        { town: "West Hartford", color: "#ff7f0e" },
        { town: "Groton", color: "#f8c471" },
        { town: "Norwalk", color: "#c0392b" },
        { town: "Shelton", color: "#2c3e50" },
        { town: "Bristol", color: "#7f8c8d" },
        { town: "Guilford", color: "#f39c12" },
        { town: "Colchester", color: "#85c1e9" },
        { town: "Westport", color: "#d35400" },
        { town: "Andover", color: "#2ecc71" },
        { town: "Portland", color: "#f5cba7" },
        { town: "Newtown", color: "#9b59b6" },
        { town: "New London", color: "#d5d8dc" },
        { town: "Columbia", color: "#7fb3d5" },
        { town: "Bethel", color: "#e74c3c" },
        { town: "Plainfield", color: "#2ecc71" },
        { town: "Canton", color: "#d35400" },
        { town: "New Fairfield", color: "#e67e22" },
        { town: "Middlefield", color: "#5dade2" },
        { town: "Bolton", color: "#8e44ad" },
        { town: "Durham", color: "#9b59b6" },
        { town: "Thompson", color: "#ff7f0e" },
        { town: "Stratford", color: "#2980b9" },
        { town: "Somers", color: "#7d3c98" },
        { town: "Wolcott", color: "#2ecc71" },
        { town: "Darien", color: "#c0392b" },
        { town: "Windsor", color: "#27ae60" },
        { town: "Farmington", color: "#8e44ad" },
        { town: "Waterford", color: "#f8c471" },
        { town: "Winchester", color: "#d62728" },
        { town: "East Hartford", color: "#e67e22" },
        { town: "Ansonia", color: "#2980b9" },
        { town: "Vernon", color: "#f39c12" },
        { town: "Bloomfield", color: "#7f8c8d" },
        { town: "New Milford", color: "#8e44ad" },
        { town: "Plymouth", color: "#c0392b" },
        { town: "Hebron", color: "#27ae60" },
        { town: "Bridgewater", color: "#d35400" },
        { town: "Union", color: "#2ecc71" },
        { town: "North Haven", color: "#8e44ad" },
        { town: "Griswold", color: "#a2d9ce" },
        { town: "Mansfield", color: "#9b59b6" },
        { town: "Salisbury", color: "#f39c12" },
        { town: "Chester", color: "#f5b041" }
    ];
    const monthMapping = {
        '1': 'Jan',
        '2': 'Feb',
        '3': 'Mar',
        '4': 'Apr',
        '5': 'May',
        '6': 'Jun',
        '7': 'Jul',
        '8': 'Aug',
        '9': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec'
    }
    const colorMap = Object.fromEntries(townColors.map(({town, color}) => [town, color]));
    const [month, setMonthBool] = useState(false);

    // Function to handle mouse over event
    const handleMouseOver = (datapoint) => {
        const crosshairData = chartData.map((town) => {
            const correspondingData = town.data.find((item) => item.x === datapoint.x);
            if (correspondingData) {
                return {
                    title: town.title,
                    x: datapoint.x,
                    y: correspondingData.y
                };
            }
            return null;
        }).filter((item) => item !== null)
        .sort((a, b) => b.y - a.y);
        setCrosshairData(crosshairData);
    };

    // Function to handle mouse out event
    const handleMouseOut = () => {
        setCrosshairData([]);
    };

    // Function to handle query results
    const handleQueryResults = (trendQuery, graphData = { features: [] }) => {
        setChartData([]);
        const features = graphData.features;
        const townData = {};
        if (!graphData || !graphData.features) {
            setChartData([
                {
                title: 'No Data',
                data: [],
                color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
                }
            ]);
            return;
        }
        let data = [];
        console.log('Query Results Features:', features);
        console.log('Trend Query:', trendQuery);
        // Format data based on trend query
        switch (trendQuery) {
            case 'Avg Sales Amount':
                features.forEach((feature) => {
                    const town = feature.properties['TOWN_NAME'];
                    const properties = feature.properties;
                    Object.keys(properties).forEach((key) => {
                        if (key !== 'TOWN_NAME') {
                            const year = key;
                            const avgSalesAmount = properties[key];
                            if (!townData[town]) {
                                townData[town] = [];
                            }
                            townData[town].push({x: year, y: avgSalesAmount});
                        }
                    });
                });
                break;
            case 'Total Sales Volume':
                features.forEach((feature) => {
                    const town = feature.properties['TOWN_NAME'];
                    const properties = feature.properties;
                    Object.keys(properties).forEach((key) => {
                        if (key !== 'TOWN_NAME') {
                            const year = key;
                            const totalSalesVolume = properties[key];
                            if (!townData[town]) {
                                townData[town] = [];
                            }
                            townData[town].push({x: year, y: totalSalesVolume});
                        }
                    });

                });
                break;
            case 'Avg Sales Ratio':
                features.forEach((feature) => {
                    const town = feature.properties['TOWN_NAME'];
                    const properties = feature.properties;
                    Object.keys(properties).forEach((key) => {
                        if (key !== 'TOWN_NAME') {
                            const year = key;
                            const avgSalesRatio = properties[key];
                            if (!townData[town]) {
                                townData[town] = [];
                            }
                            townData[town].push({x: year, y: avgSalesRatio});
                        }
                    });
                });
                break;
            case 'Avg Assessed Value':
                features.forEach((feature) => {
                    const town = feature.properties['TOWN_NAME'];
                    const properties = feature.properties;
                    Object.keys(properties).forEach((key) => {
                        if (key !== 'TOWN_NAME') {
                            const year = key;
                            const avgAssessedValue = properties[key];
                            if (!townData[town]) {
                                townData[town] = [];
                            }
                            townData[town].push({x: year, y: avgAssessedValue});
                        }
                    });

                });
                break;
            case 'Total Sales Volume mnth':
                features.forEach((feature) => {
                    const town = feature.properties['TOWN_NAME'];
                    const properties = feature.properties;
                    Object.keys(properties).forEach((key) => {
                        if (key !== 'TOWN_NAME') {
                            const month = key;
                            const totalSalesVolume = properties[key];
                            if (!townData[town]) {
                                townData[town] = [];
                            }
                            townData[town].push({x: month, y: totalSalesVolume});
                        }
                    });
                });
                break;
            default:
                console.error('Unknown trend query:', trendQuery);
        }
        // Format data for graph
        data = Object.keys(townData).map((town, index) => ({
            title: town,
            data: townData[town].filter((item, index, self) => (
                    // Remove duplicates
                    index === self.findIndex((t) =>
                        t.x === item.x && t.y === item.y
                    )
                )).sort((a, b) => a.x - b.x
            ),
            color: colorMap[town] || `#${Math.floor(Math.random() * 16777215).toString(16)}`
        }));
        // Format month data
        data.forEach((town) => {
            town.data.forEach((item) => {
                if (trendQuery === 'Total Sales Volume mnth') {
                    item.x = monthMapping[item.x];
                }
            });
        });
        setChartData(data);
        console.log('Chart Data:', data);
    };

    // Update graph data when graph data changes
    useEffect(() => {
        handleQueryResults(trendQuery, graphData);
        setMonthBool(trendQuery === 'Total Sales Volume mnth');
    }, [graphData]);

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <div style={{flex: 1}}>
                <XYPlot
                    width={1000}
                    height={600}
                    xType={month ? 'ordinal' : 'linear'}
                    yDomain={[0, Math.max(...chartData.flatMap(town => town.data.map(item => item.y)), 0)]}
                    margin={{left: 100, right: 25, top: 50, bottom: 50}}>
                    <HorizontalGridLines/>
                    <VerticalGridLines/>
                    <XAxis
                        tickFormat={v => v}
                        tickTotal={month ? 12 : chartData.length > 0 ? chartData[0].data.length : undefined}
                    />
                    <YAxis
                        title={trendQuery}
                    />
                    {chartData.map((town, index) => (
                        <LineSeries
                            key={index}
                            data={town.data.map((item) => ({
                                x: item.x,
                                y: item.y
                            }))}
                            color={town.color}
                            onNearestXY={(datapoint) => handleMouseOver(datapoint, town.title)}
                            onSeriesMouseOut={handleMouseOut}
                            curve={'curveMonotoneX'}
                            animation
                        />
                    ))}
                    <Crosshair values={crosshairData}>
                        <div style={{ background: 'white', padding: '10px', border: '2px solid #ccc', color: 'black' }}>
                            {crosshairData.map((d, index) => (
                                <div key={index}>
                                    <strong>{d.title}:</strong> {d.y}
                                    <p> </p>
                                </div>
                            ))}
                        </div>
                    </Crosshair>
                </XYPlot>
            </div>
            <div style={{ width: '170px', maxWidth: '170px'}}>
                <DiscreteColorLegend
                    orientation="vertical"
                    items={chartData.map(town => ({title: town.title, color: town.color}))}
                />
            </div>
        </div>
    );
}
export default Graph;