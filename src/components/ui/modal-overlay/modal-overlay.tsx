import React from 'react';
import styles from './modal-overlay.module.css';

export const ModalOverlayUI = ({
  onClick,
  ...rest
}: { onClick: () => void } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={styles.overlay} onClick={onClick} {...rest} />
);
