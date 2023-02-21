import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Grid,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

export default function Layout({ children }) {
  const [topics, setTopics] = useState([]);
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "topics")
      .then((resp) => resp.json())
      .then((result) => setTopics(result));
  }, [router.asPath]);

  const handleDelete = () => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "topics/" + router.query.id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        router.push("/");
        setOpenDelete(false);
      });
  };

  return (
    // MUI ui framework 적용해보기
    <Container maxWidth="sm">
      <h1>
        <Link href="/">WEB</Link>
      </h1>
      <Grid container>
        <Grid item xs={12} sm={3}>
          <ol>
            {topics.map((topic) => (
              <li key={topic.id}>
                <Link href={"/read/" + topic.id}>{topic.title}</Link>
              </li>
            ))}
          </ol>
        </Grid>
        <Grid item xs={12} sm={9}>
          <article>{children}</article>
          <Box
            sx={{
              marginTop: 1,
            }}
          >
            <Button
              variant="contained"
              components={Link}
              href="/create"
              sx={{
                marginRight: 1,
              }}
            >
              Create
            </Button>
            {router.query.id === undefined ? null : (
              <>
                <Button
                  variant="contained"
                  components={Link}
                  href={"/update/" + router.query.id}
                  sx={{
                    marginRight: 1,
                  }}
                >
                  Update
                </Button>
                <Button variant="contained" onClick={() => setOpenDelete(true)}>
                  Delete
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle id="alert-dialog-title">Really?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            It will be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Disagree</Button>
          <Button autoFocus onClick={handleDelete}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
