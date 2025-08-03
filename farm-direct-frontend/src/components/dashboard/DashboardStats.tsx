import React from 'react';
import { ShoppingBag, Users, DollarSign, TrendingUp } from 'lucide-react';
import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  isPositive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  isPositive = true,
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-green-100 mr-4">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {change && (
            <p className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{change} {isPositive ? '↑' : '↓'}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

interface DashboardStatsProps {
  role: 'farmer' | 'buyer';
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ role }) => {
  const farmerStats = [
    {
      title: 'Total Products',
      value: 12,
      icon: <ShoppingBag className="h-6 w-6 text-green-600" />,
      change: '15%',
      isPositive: true,
    },
    {
      title: 'Total Orders',
      value: 48,
      icon: <ShoppingBag className="h-6 w-6 text-green-600" />,
      change: '12%',
      isPositive: true,
    },
    {
      title: 'Total Revenue',
      value: '$1,245.89',
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
      change: '18%',
      isPositive: true,
    },
    {
      title: 'Buyer Ratings',
      value: '4.8',
      icon: <Users className="h-6 w-6 text-green-600" />,
      change: '0.2',
      isPositive: true,
    },
  ];

  const buyerStats = [
    {
      title: 'Total Orders',
      value: 24,
      icon: <ShoppingBag className="h-6 w-6 text-green-600" />,
      change: '8%',
      isPositive: true,
    },
    {
      title: 'Total Spent',
      value: '$876.50',
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
      change: '5%',
      isPositive: false,
    },
    {
      title: 'Farmers Rated',
      value: 15,
      icon: <Users className="h-6 w-6 text-green-600" />,
    },
    {
      title: 'Market Trends',
      value: 'Stable',
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
    },
  ];

  const stats = role === 'farmer' ? farmerStats : buyerStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          change={stat.change}
          isPositive={stat.isPositive}
        />
      ))}
    </div>
  );
};

export default DashboardStats;