import { WithFirebaseApiProps, withFirebaseApi } from "../Firebase";
import { Box, Stack, TextField, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { TweetWithId } from "../types";
import Tweet from "./Tweet";
import { useParams } from "react-router-dom";

const ProfilePageBase = (props: WithFirebaseApiProps) => {
  const [tweets, setTweets] = useState<Array<TweetWithId> | null>(null);
  const params = useParams();

  const fetchTweets = () => {
    if (params.userId == null) {
      return;
    }
    props.firebaseApi.asyncGetProfileFeed(params.userId!).then((tweets) => {
      setTweets(tweets);
    });
  };
  useEffect(() => {
    fetchTweets();
  }, []);

  if (params.userId == null) {
    return <Typography>Something went wrong...</Typography>;
  }
  if (tweets === null) {
    return <CircularProgress />;
  }
  return (<>
    {tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
  </>);
}

export default withFirebaseApi(ProfilePageBase);
