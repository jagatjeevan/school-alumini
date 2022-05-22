import Link from "next/link";
import style from '../styles/Header.module.css';

const Header = () => {
    return (
      <header className={style.header}>
        <Link href="/">Dashboard</Link>
        <Link href="/add-school">Add school</Link>
        <Link href="/add-batch">Add batch</Link>
        <Link href="/delete-school">Delete school</Link>
      </header>
    );
}

export default Header;