import React from 'react';
import { Bell, ShoppingBag, CreditCard, Leaf, MessageCircle } from 'lucide-react';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Notification } from '../../types';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onViewAll?: () => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkAsRead,
  onViewAll,
}) => {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="h-5 w-5 text-amber-500" />;
      case 'payment':
        return <CreditCard className="h-5 w-5 text-purple-500" />;
      case 'diagnosis':
        return <Leaf className="h-5 w-5 text-green-500" />;
      case 'message':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  if (notifications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">No notifications yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          </div>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {notifications.filter(n => !n.read).length} new
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start p-3 rounded-md transition-colors ${
                !notification.read ? 'bg-green-50' : ''
              }`}
            >
              <div className="flex-shrink-0 mr-3">{getIcon(notification.type)}</div>
              <div className="flex-grow">
                <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
              {!notification.read && onMarkAsRead && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="text-xs text-green-600 hover:text-green-800 font-medium"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      {onViewAll && (
        <CardFooter className="bg-gray-50">
          <button
            onClick={onViewAll}
            className="text-green-600 hover:text-green-800 text-sm font-medium"
          >
            View all notifications
          </button>
        </CardFooter>
      )}
    </Card>
  );
};

export default NotificationList;