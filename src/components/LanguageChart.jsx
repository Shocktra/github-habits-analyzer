import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './LanguageChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LanguageChart({ langData }) {
  if (!langData || langData.labels.length === 0) {
    return (
      <div className="glass-panel chart-container animate-fade-in empty-state">
        <p>Dil verisi bulunamadı.</p>
      </div>
    );
  }

  const data = {
    labels: langData.labels,
    datasets: [
      {
        data: langData.data,
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)', // accent blue
          'rgba(16, 185, 129, 0.8)', // green
          'rgba(245, 158, 11, 0.8)', // orange
          'rgba(236, 72, 153, 0.8)', // pink
          'rgba(139, 92, 246, 0.8)', // purple
        ],
        borderColor: 'rgba(30, 41, 59, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#f8fafc',
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      }
    },
    cutout: '70%',
  };

  return (
    <div className="glass-panel chart-container animate-fade-in">
      <h3>En Çok Kullanılan Diller</h3>
      <div className="chart-wrapper">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
