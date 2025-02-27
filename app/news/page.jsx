import Link from "next/link";

export default function NewsPage() {
  return (
    <>
      <h1>News</h1>
      <ul>
        <li>
          <Link href="/news/laserhatt">First Link</Link>
        </li>
        <li>
          <Link href="/news/djungel-jim">First Link</Link>
        </li>
        <li>
          <Link href="/news/mackaper-per">First Link</Link>
        </li>
      </ul>
    </>
  );
}
