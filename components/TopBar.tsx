import Link from "next/link";
import SignIn from "@/components/signin/Sign"

export async function TopBar() {
    return (
        <header>
            <div>
                <Link href="/">Home </Link>
                <Link href="/user">User </Link>
                <Link href="/article">Articles </Link>
                <Link href="/follow">Follow </Link>
                <Link href="/pay">Pay </Link>
            </div>
            <SignIn/>
        </header>
    );
}

export default TopBar;
