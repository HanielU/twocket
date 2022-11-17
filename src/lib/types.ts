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
  creator: TwocketUser;
  content: string;
  twock_type: "fresh" | "comment";
  comments: Twock[];
}>;

export type TwockCollection = PocketCollection<Twock>;

export interface TwocketUser extends PR {
  fullname: string;
  username: string;
  created_twocks: Twock[];
  liked_twocks: Twock[];
  bookmarked_twocks: Twock[];
  retwocks: Twock[];

  // profile: PR & {
  //   fullname: string;
  //   username: string;
  //   created_twocks: Twock[];
  //   liked_twocks: Twock[];
  //   bookmarked_twocks: Twock[];
  //   retwocks: Twock[];
  // };
}

// export type d = TwocketUser["profile"][''];

// possible overcomplication of matters
/* 
type twockType = "fresh_twock" | "comment_twock";

export type Twock<T extends twockType> = PocketRecord<
  // T extends ""?
  T extends "fresh_twock"
    ? {
        creator: string;
        content: string;
        twock_type: T;
        comments: Twock<"comment_twock">[];
      }
    : {
        creator: string;
        content: string;
        twock_type: T;
        replies: Twock<"comment_twock">[];
      }
>;

export type TwockCollection = PocketCollection<Twock<"fresh_twock">>;

export interface TwocketUser extends User {
  profile: PR & {
    fullname: string;
    username: string;
    created_twocks: Twock<"comment_twock">[];
    liked_twocks: Twock<twockType>[];
    bookmarked_twocks: Twock<twockType>[];
    retwocks: Twock<twockType>[];
  };
}

export type d = TwocketUser["profile"]['created_twocks'];
*/
