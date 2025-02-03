import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOT_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupCardType } from "./StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const userStartups = await client.fetch(STARTUPS_BY_AUTHOT_QUERY, { id });
  return (
    <>
      {userStartups.length > 0 ? (
        userStartups.map((startup: StartupCardType) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};

export default UserStartups;
