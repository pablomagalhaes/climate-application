import { notification, Button } from 'antd';

const defaultNotification = {
  placement: 'topRight',
  duration: 3
};

export const showSuccessNotification = () => {
  notification.success({
    ...defaultNotification,
    message: 'Sucesso!',
  });
};

export const showFailureNotification = () => {
  notification.error({
    ...defaultNotification,
    message: 'Não foi possível obter as informações',
  });
};

export const showWarningNotification = () => {
  notification.warning({
    ...defaultNotification,
    message: 'Não foi possível sas as informações',
  });
};

export const showUpdateNotification = (resolve, reject) => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button 
      type="primary" 
      size="small" 
      onClick={() => {
        resolve()
        notification.close(key);
      }}
    >
      Atualizar
    </Button>
  );

  notification.destroy();

  return notification.warning({
    placement: 'topRight',
    message: 'Existem informações novas. Deseja atualizar a tabela?',
    key,
    btn,
    duration: 0,
    onClose: () => reject(notification)
  });
};
