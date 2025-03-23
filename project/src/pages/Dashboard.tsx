import React from 'react';
import { 
  Users, 
  Calendar, 
  Clock,
  Activity,
  TrendingUp
} from 'lucide-react';

const stats = [
  { name: 'Total Patients', value: '2,345', icon: Users, change: '+4.75%', changeType: 'increase' },
  { name: 'Appointments Today', value: '45', icon: Calendar, change: '+12.5%', changeType: 'increase' },
  { name: 'Average Wait Time', value: '14 min', icon: Clock, change: '-23.4%', changeType: 'decrease' },
  { name: 'Patient Satisfaction', value: '98%', icon: Activity, change: '+2.3%', changeType: 'increase' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Last updated: Just now</span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <TrendingUp className={`self-center flex-shrink-0 h-4 w-4 ${
                            stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                          }`} />
                          <span className="ml-1">{stat.change}</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Placeholder for additional dashboard components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Activity items will be added here */}
            <p className="text-gray-500 text-sm">Loading activities...</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {/* Appointments will be added here */}
            <p className="text-gray-500 text-sm">Loading appointments...</p>
          </div>
        </div>
      </div>
    </div>
  );
}