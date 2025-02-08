"use client";
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function Analytics() {
  // Dummy data for monthly mood trends
  const monthlyMoodData = [
    { name: 'Jan', mood: 7.5 },
    { name: 'Feb', mood: 6.8 },
    { name: 'Mar', mood: 8.2 },
    { name: 'Apr', mood: 7.9 },
    { name: 'May', mood: 8.5 },
    { name: 'Jun', mood: 7.2 },
  ];

  // Dummy data for emotion distribution
  const emotionData = [
    { name: 'Happy', value: 35 },
    { name: 'Calm', value: 25 },
    { name: 'Excited', value: 20 },
    { name: 'Stressed', value: 15 },
    { name: 'Anxious', value: 5 },
  ];

  // Dummy data for activity impact
  const activityData = [
    { name: 'Exercise', impact: 8.5 },
    { name: 'Reading', impact: 7.8 },
    { name: 'Meditation', impact: 8.2 },
    { name: 'Social', impact: 7.9 },
    { name: 'Work', impact: 6.5 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE'];

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-gradient-to-br from-purple-300 to-blue-300 dark:from-purple-800 dark:to-blue-900 p-4">
          <h3 className="text-lg font-semibold mb-4 text-white">Monthly Mood Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyMoodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-blue-300 to-purple-300 dark:from-blue-800 dark:to-purple-900 p-4">
          <h3 className="text-lg font-semibold mb-4 text-white">Emotion Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={emotionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {emotionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-purple-300 to-blue-300 dark:from-purple-800 dark:to-blue-900 p-4">
          <h3 className="text-lg font-semibold mb-4 text-white">Activity Impact</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="impact" fill="#82ca9d" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-r from-purple-400 to-blue-500 p-4">
        <h3 className="text-lg font-semibold mb-4 text-white">Weekly Insights</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-white/10 p-4">
            <h4 className="text-white mb-2">Mood Patterns</h4>
            <p className="text-white/80">Your mood tends to be highest in the mornings and after exercise sessions.</p>
          </div>
          <div className="rounded-xl bg-white/10 p-4">
            <h4 className="text-white mb-2">Recommendations</h4>
            <p className="text-white/80">Consider incorporating more morning exercises to maintain positive energy throughout the day.</p>
          </div>
        </div>
      </div>
    </div>
  );
}