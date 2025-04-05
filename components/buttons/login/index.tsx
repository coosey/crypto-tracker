import Link from "next/link";
import styles from './index.module.scss';

export const LoginButton = () => {
  return (
    <Link href="/login">
      <button className={styles?.['login']}>Login</button>
    </Link>
  );
};