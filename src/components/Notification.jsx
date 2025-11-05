import { useState, useEffect } from 'react';

const Notification = ({ message, duration = 2000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return isVisible ? (
    <div className="notification">
      {message}
    </div>
  ) : null;
};

export default Notification;