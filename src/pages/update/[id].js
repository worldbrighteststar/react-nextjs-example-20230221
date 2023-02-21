import { useState } from "react";
import { useRouter } from "next/router";

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

export default function Update({ topic }) {
  const [title, setTitle] = useState(topic.title);
  const [body, setBody] = useState(topic.body);
  const router = useRouter();

  return (
    <>
      <h2>{topic.title}</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const option = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: event.target.title.value,
              body: event.target.body.value,
            }),
          };

          fetch(
            process.env.NEXT_PUBLIC_API_URL + "topics/" + router.query.id,
            option
          )
            .then((resp) => resp.json())
            .then((result) => {
              router.push("/read/" + result.id);
            });
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(e) => setBody(e.target.body)}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="save" />
        </p>
      </form>
    </>
  );
}
