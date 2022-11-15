import type { Record as PR } from "pocketbase";

export type PocketRecord<Props = Record<string, unknown>> = PR & {
  [K in keyof Props]: Props[K];
};

export type PocketCollection<Item extends PocketRecord> = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Item[];
};

export type Twock = PocketRecord<{
  creator: string;
  content: string;
  tweet_type: "fresh_tweet" | "comment_tweet";
  comments: Twock[];
}>;

export type TwockCollection = PocketCollection<Twock>;

export interface TwocketUser extends PR {
  profile: PR & {
    fullname: string;
    username: string;
    created_tweets: Twock[];
    liked_tweets: Twock[];
    bookmarked_tweets: Twock[];
    retweets: Twock[];
  };
}

// export type d = TwocketUser["profile"][''];

// possible overcomplication of matters
/* 
type TweetType = "fresh_tweet" | "comment_tweet";

export type Twock<T extends TweetType> = PocketRecord<
  // T extends ""?
  T extends "fresh_tweet"
    ? {
        creator: string;
        content: string;
        tweet_type: T;
        comments: Twock<"comment_tweet">[];
      }
    : {
        creator: string;
        content: string;
        tweet_type: T;
        replies: Twock<"comment_tweet">[];
      }
>;

export type TwockCollection = PocketCollection<Twock<"fresh_tweet">>;

export interface TwocketUser extends User {
  profile: PR & {
    fullname: string;
    username: string;
    created_tweets: Twock<"comment_tweet">[];
    liked_tweets: Twock<TweetType>[];
    bookmarked_tweets: Twock<TweetType>[];
    retweets: Twock<TweetType>[];
  };
}

export type d = TwocketUser["profile"]['created_tweets'];
*/
