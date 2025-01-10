import { useEffect } from 'react';
import { io } from 'socket.io-client';
export const useSocket = ({
  url = 'https://craa-api-dev-v3.hoansoft.com',
  user,
}: {
  url?: string;
  user?: any;
}) => {
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL!;
    const socket = io(url);
    socket.on('connect', function () {
      if (user?._id) socket.emit('login', user._id);
    });

    socket.on('disconnect', function (reason) {
      // console.log('reason', reason);
      // socketStore.status = 'disconnect';
    });

    return () => {
      socket.close();
    };
  }, [user?._id]);

  return null;
};
