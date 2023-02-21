// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

/*
Server Side Rendering 방법
server-side에서 data를 받아 props로 client-side로 전달함.
즉, client-side에서 동적 js처리가 불필요하다. (=정적페이지로 완성하여 client에 전달)
*/
export async function getServerSideProps(context) {
  const resp = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "topics/" + context.params.id
  );
  const result = await resp.json();

  return {
    props: {
      topic: result,
    }, // will be passed to the page component as props
  };
}

export default function Home({ topic }) {
  //   const [topic, setTopic] = useState(null);
  //   const router = useRouter();

  //   useEffect(() => {
  //     if (router.query.id !== undefined) {
  //       fetch("http://localhost:9999/topics/" + router.query.id)
  //         .then((resp) => resp.json())
  //         .then((result) => setTopic(result));
  //     }
  //   }, [router.query.id]);

  return (
    <>
      <h2>{topic.title}</h2>
      {topic.body}
    </>
  );
}
