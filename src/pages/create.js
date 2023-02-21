import { useRouter } from "next/router";

export default function Create() {
  const router = useRouter();

  return (
    <>
      <h2>CREATE</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const option = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: event.target.title.value,
              body: event.target.body.value,
            }),
          };

          fetch(process.env.NEXT_PUBLIC_API_URL + "topics", option)
            .then((resp) => resp.json())
            .then((result) => {
              router.push("/read/" + result.id);
            });
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="create" />
        </p>
      </form>
    </>
  );
}
