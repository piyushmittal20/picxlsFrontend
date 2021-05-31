import { Line } from "react-chartjs-2";

const LineChart = ({ data1, data2, data3, data4 }) => {
  const data = {
    labels: ["1 days", "7 days", "14 days", "28 days"],
    datasets: [
      {
        label: "No. of Users",
        data: [data4, data1, data2, data3],
        fill: true,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
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
