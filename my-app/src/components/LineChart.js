import { Line } from "react-chartjs-2";

const LineChart = ({ data1, data2, data3, data4 }) => {
  const data = {
    labels: ["1 days", "7 days", "14 days", "28 days"],
    datasets: [
      {
        label: "No. of Users",
        data: [data4, data1, data2, data3],
        fill: true,
        backgroundColor: "rgb(7, 32, 98)",
        borderColor: "#3B14A7",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  return <Line data={data} options={options} className="chart" />;
};

export default LineChart;
